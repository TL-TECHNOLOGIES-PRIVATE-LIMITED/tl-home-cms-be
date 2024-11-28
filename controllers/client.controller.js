import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { deleteImageFromCloudinary, imageUploadToCloudinary } from "../helpers/image.upload.js";

const prisma = new PrismaClient();

export const createClient = async (req, res) => {
    const { name, website, description, order } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'No logo image provided', success: false });
    }

    // Validate required fields
    if (!name || !order) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }

    try {
        const folderPath = 'scf/clients';
        const result = await imageUploadToCloudinary(req.file, folderPath);

        const client = await prisma.client.create({
            data: {
                id: uuidv4(),
                name,
                logo: result.secure_url,
                website,
                description,
                order: parseInt(order, 10),
                isActive: true
            }
        });

        return res.status(201).json({
            success: true,
            message: "Client created successfully",
            data: client
        });

    } catch (error) {
        console.error("Error creating client:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the client"
        });
    }
};

export const getAllClients = async (req, res) => {
    try {
        const clients = await prisma.client.findMany({
            orderBy: {
                order: 'asc'
            }
        });

        return res.status(200).json({
            success: true,
            message: "Clients fetched successfully",
            data: clients
        });

    } catch (error) {
        console.error("Error fetching clients:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching clients"
        });
    }
};

export const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, website, description, order, isActive } = req.body;

    // Validate required fields
    if (!name || !order) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }

    try {
        // Check if client exists
        const existingClient = await prisma.client.findUnique({
            where: { id }
        });

        if (!existingClient) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        let logoUrl = existingClient.logo;

        // If there's a new logo uploaded
        if (req.file) {
            // Delete the old logo from Cloudinary
            const publicId = existingClient.logo.split('/').slice(7, -1).join('/') + '/' + existingClient.logo.split('/').pop().split('.')[0];
            await deleteImageFromCloudinary(publicId);

            // Upload the new logo
            const folderPath = 'scf/clients';
            const result = await imageUploadToCloudinary(req.file, folderPath);
            logoUrl = result.secure_url;
        }

        // Update client
        const updatedClient = await prisma.client.update({
            where: { id },
            data: {
                name,
                logo: logoUrl,
                website,
                description,
                order: parseInt(order, 10),
                isActive: isActive === 'true',
                updatedAt: new Date()
            }
        });

        return res.status(200).json({
            success: true,
            message: "Client updated successfully",
            data: updatedClient
        });

    } catch (error) {
        console.error("Error updating client:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the client"
        });
    }
};

export const deleteClient = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if client exists
        const existingClient = await prisma.client.findUnique({
            where: { id }
        });

        if (!existingClient) {
            return res.status(404).json({
                success: false,
                message: "Client not found"
            });
        }

        // Delete the logo from Cloudinary
        const publicId = existingClient.logo.split('/').slice(7, -1).join('/') + '/' + existingClient.logo.split('/').pop().split('.')[0];
        await deleteImageFromCloudinary(publicId);

        // Delete client
        await prisma.client.delete({
            where: { id }
        });

        return res.status(200).json({
            success: true,
            message: "Client deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting client:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the client"
        });
    }
}; 