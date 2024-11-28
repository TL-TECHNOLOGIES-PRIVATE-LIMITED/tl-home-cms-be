import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const createPrivacyPolicy = async (req, res) => {
    const { title, content, order } = req.body;

    // Validate required fields
    if (!title || !content || !order) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }

    try {
        const privacyPolicy = await prisma.privacyPolicy.create({
            data: {
                id: uuidv4(),
                title,
                content,
                order
            }
        });

        return res.status(201).json({
            success: true,
            message: "Privacy policy created successfully",
            data: privacyPolicy
        });

    } catch (error) {
        console.error("Error creating privacy policy:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the privacy policy"
        });
    }
};

export const getAllPrivacyPolicies = async (req, res) => {
    try {
        const privacyPolicies = await prisma.privacyPolicy.findMany({
            orderBy: {
                order: 'asc'
            }
        });

        return res.status(200).json({
            success: true,
            message: "Privacy policies fetched successfully",
            data: privacyPolicies
        });

    } catch (error) {
        console.error("Error fetching privacy policies:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching privacy policies"
        });
    }
};

export const updatePrivacyPolicy = async (req, res) => {
    const { id } = req.params;
    const { title, content, order } = req.body;

    // Validate required fields
    if (!title || !content || !order) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }

    try {
        // Check if privacy policy exists
        const existingPolicy = await prisma.privacyPolicy.findUnique({
            where: { id }
        });

        if (!existingPolicy) {
            return res.status(404).json({
                success: false,
                message: "Privacy policy not found"
            });
        }

        // Update privacy policy
        const updatedPolicy = await prisma.privacyPolicy.update({
            where: { id },
            data: {
                title,
                content,
                order,
                updatedAt: new Date()
            }
        });

        return res.status(200).json({
            success: true,
            message: "Privacy policy updated successfully",
            data: updatedPolicy
        });

    } catch (error) {
        console.error("Error updating privacy policy:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the privacy policy"
        });
    }
};

export const deletePrivacyPolicy = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if privacy policy exists
        const existingPolicy = await prisma.privacyPolicy.findUnique({
            where: { id }
        });

        if (!existingPolicy) {
            return res.status(404).json({
                success: false,
                message: "Privacy policy not found"
            });
        }

        // Delete privacy policy
        await prisma.privacyPolicy.delete({
            where: { id }
        });

        return res.status(200).json({
            success: true,
            message: "Privacy policy deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting privacy policy:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the privacy policy"
        });
    }
}; 