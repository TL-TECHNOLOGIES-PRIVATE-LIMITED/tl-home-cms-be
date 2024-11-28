import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { deleteImageFromCloudinary, imageUploadToCloudinary } from "../helpers/image.upload.js";

const prisma = new PrismaClient();


export const addTeam = async (req, res) => {
    const { name, position, bio, linkedin, email, order } = req.body;

    // Validate required fields
    if (!name || !position || !bio) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields: name, position, and bio."
        });
    }
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Please provide an image file."
        });
    }

    try {
        const folderPath = 'scf/team';  // Specify your folder path here
        const result = await imageUploadToCloudinary(req.file, folderPath);
        let imageUrl = result.secure_url;


        const orderValue = order ? parseInt(order, 10) : null;
        // Create new team member record in the database
        const newTeamMember = await prisma.team.create({
            data: {
                id: uuidv4(),
                name,
                position,
                bio,
                linkedin: linkedin,
                email: email,
                image: imageUrl,
                order: orderValue,
                isActive: true,
            }
        });

        return res.status(201).json({
            success: true,
            message: "Team member added successfully",
            data: newTeamMember
        });
    } catch (error) {
        console.error("Error adding team member:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while adding the team member."
        });
    }
};


export const getActiveTeam = async (req, res) => {

    try {
        const team = await prisma.team.findMany({
            where: {
                isActive: true
            },
            orderBy: {
                order: 'asc'
            },
            select: {
                id: true,
                name: true,
                position: true,
                image: true,
                bio: true,
                linkedin: true,
                email: true,
                order: true
            }
        });

        return res.status(200).json({
            success: true,
            message: "Team members fetched successfully.",
            team: team
        });
    } catch (error) {

    }
}

export const getAllTeam = async (req, res) => { 

    try {
        const team = await prisma.team.findMany()
        return res.status(200).json({
            success: true,
            message: "Team members fetched successfully.",
            team: team
        });
        
    } catch (error) {
        console.log(error ,"Error fetching team members");
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching team members."
        });
        
    }
}


export const updateTeam = async (req, res) => {
    const { id } = req.params;
    const { name, position, bio, linkedin, email, order, isActive } = req.body;

    // Validate required fields
    if (!name || !position || !bio) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields: name, position, and bio."
        });
    }

    try {
        // Check if the team member exists
        const existingTeamMember = await prisma.team.findUnique({
            where: { id }
        });

        if (!existingTeamMember) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            });
        }

        // Update image if a new file is uploaded
        if (req.file) {
            // Delete the old image from Cloudinary if it exists
            if (existingTeamMember.image) {
                const publicId = existingTeamMember.image.split('/').slice(7, -1).join('/') + '/' + existingTeamMember.image.split('/').pop().split('.')[0];
                await deleteImageFromCloudinary(publicId); // Ensure this function exists to delete images
            }

            // Upload the new image
            const folderPath = 'scf/team';
            const result = await imageUploadToCloudinary(req.file, folderPath); // Ensure this function exists to upload images

            req.body.image = result.secure_url; // Update the image URL
        }

        // Update team member details
        const updatedTeamMember = await prisma.team.update({
            where: { id },
            data: {
                name,
                position,
                bio,
                linkedin,
                email,
                order: parseInt(order),
                isActive: isActive === 'false' ? false : true,
                image: req.body.image || existingTeamMember.image, 
                updatedAt: new Date() 
            }
        });

        return res.status(200).json({
            success: true,
            message: "Team member updated successfully",
            data: updatedTeamMember
        });

    } catch (error) {
        console.error("Error updating team member:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the team member"
        });
    }
};



export const deleteTeamMember = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if team member exists
        const existingTeamMember = await prisma.team.findUnique({
            where: { id }
        });

        if (!existingTeamMember) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            });
        }
        const publicId = existingTeamMember.image.split('/').slice(7, -1).join('/') + '/' + existingTeamMember.image.split('/').pop().split('.')[0];
        await deleteImageFromCloudinary(publicId);

        // Delete team member
        await prisma.team.delete({
            where: { id }
        });

        return res.status(200).json({
            success: true,
            message: "Team member deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting team member:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the team member"
        });
    }
};