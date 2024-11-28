import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { deleteImageFromCloudinary, imageUploadToCloudinary } from "../helpers/image.upload.js";

const prisma = new PrismaClient();

// Create a new catalogue
export const createCatalogue = async (req, res) => {
    const { title, description, category, order } = req.body;
    const files = req.files || {};

    if (!files.image) {
        return res.status(400).json({ 
            success: false,
            message: 'Catalogue image is required' 
        });
    }

    if (!title || !description || !order || !category) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields (title, description, order, category)"
        });
    }

    try {
        const folderPath = 'scf/catalogues';
        const imageResult = await imageUploadToCloudinary(files.image[0], folderPath);
        
        let fileUrl = null;
        if (files.document) {
            const documentFolderPath = 'scf/catalogues/documents';
            const documentResult = await imageUploadToCloudinary(files.document[0], documentFolderPath);
            fileUrl = documentResult.secure_url;
        }

        const catalogue = await prisma.catalogue.create({
            data: {
                id: uuidv4(),
                title,
                description,
                image: imageResult.secure_url,
                file: fileUrl,
                category,
                order: parseInt(order, 10),
                isActive: true
            }
        });

        return res.status(201).json({
            success: true,
            message: "Catalogue created successfully",
            data: catalogue
        });

    } catch (error) {
        console.error("Error creating catalogue:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the catalogue"
        });
    }
};

// Get all catalogues
export const getAllCatalogues = async (req, res) => {
    try {
        const catalogues = await prisma.catalogue.findMany({
            orderBy: {
                order: 'asc'
            }
        });

        return res.status(200).json({
            success: true,
            message: "Catalogues fetched successfully",
            data: catalogues
        });

    } catch (error) {
        console.error("Error fetching catalogues:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching catalogues"
        });
    }
};

// Get a single catalogue by ID
export const getCatalogueById = async (req, res) => {
    const { id } = req.params;

    try {
        const catalogue = await prisma.catalogue.findUnique({
            where: { id }
        });

        if (!catalogue) {
            return res.status(404).json({
                success: false,
                message: "Catalogue not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Catalogue fetched successfully",
            data: catalogue
        });

    } catch (error) {
        console.error("Error fetching catalogue:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching the catalogue"
        });
    }
};

// Update catalogue
export const updateCatalogue = async (req, res) => {
    const { id } = req.params;
    const { title, description, category, order, isActive } = req.body;
    const files = req.files || {};

    if (!title || !description || !order) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }

    try {
        const existingCatalogue = await prisma.catalogue.findUnique({
            where: { id }
        });

        if (!existingCatalogue) {
            return res.status(404).json({
                success: false,
                message: "Catalogue not found"
            });
        }

        let imageUrl = existingCatalogue.image;
        let fileUrl = existingCatalogue.file;

        if (files.image) {
            const publicId = existingCatalogue.image.split('/').slice(7, -1).join('/') + '/' + existingCatalogue.image.split('/').pop().split('.')[0];
            await deleteImageFromCloudinary(publicId);
            
            const folderPath = 'scf/catalogues';
            const imageResult = await imageUploadToCloudinary(files.image[0], folderPath);
            imageUrl = imageResult.secure_url;
        }

        if (files.document) {
            if (existingCatalogue.file) {
                const filePublicId = existingCatalogue.file.split('/').slice(7, -1).join('/') + '/' + existingCatalogue.file.split('/').pop().split('.')[0];
                await deleteImageFromCloudinary(filePublicId);
            }
            
            const folderPath = 'scf/catalogues/documents';
            const fileResult = await imageUploadToCloudinary(files.document[0], folderPath);
            fileUrl = fileResult.secure_url;
        }

        const updatedCatalogue = await prisma.catalogue.update({
            where: { id },
            data: {
                title,
                description,
                image: imageUrl,
                file: fileUrl,
                category,
                order: parseInt(order, 10),
                isActive: isActive === 'true',
                updatedAt: new Date()
            }
        });

        return res.status(200).json({
            success: true,
            message: "Catalogue updated successfully",
            data: updatedCatalogue
        });

    } catch (error) {
        console.error("Error updating catalogue:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the catalogue"
        });
    }
};

// Delete catalogue
export const deleteCatalogue = async (req, res) => {
    const { id } = req.params;

    try {
        const existingCatalogue = await prisma.catalogue.findUnique({
            where: { id }
        });

        if (!existingCatalogue) {
            return res.status(404).json({
                success: false,
                message: "Catalogue not found"
            });
        }

        // Delete image from Cloudinary
        const imagePublicId = existingCatalogue.image.split('/').slice(7, -1).join('/') + '/' + existingCatalogue.image.split('/').pop().split('.')[0];
        await deleteImageFromCloudinary(imagePublicId);

        // Delete file from Cloudinary if it exists
        if (existingCatalogue.file) {
            const filePublicId = existingCatalogue.file.split('/').slice(7, -1).join('/') + '/' + existingCatalogue.file.split('/').pop().split('.')[0];
            await deleteImageFromCloudinary(filePublicId);
        }

        await prisma.catalogue.delete({
            where: { id }
        });

        return res.status(200).json({
            success: true,
            message: "Catalogue deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting catalogue:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the catalogue"
        });
    }
}; 