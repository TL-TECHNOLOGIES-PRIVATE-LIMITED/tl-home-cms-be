import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Create a new social media entry
// export const createSocial = async (req, res) => {
//     const { platform, url, isActive } = req.body;

//     // Only URL is required now
//     if (!url) {
//         return res.status(400).json({
//             success: false,
//             message: "Please provide the required URL field"
//         });
//     }

//     try {
//         const social = await prisma.social.create({
//             data: {
//                 id: uuidv4(),
//                 platform: platform || null,
//                 url,
//                 isActive: isActive !== undefined ? isActive : true
//             }
//         });

//         return res.status(201).json({
//             success: true,
//             message: "Social media entry created successfully",
//             data: social
//         });

//     } catch (error) {
//         console.error("Error creating social media entry:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while creating the social media entry"
//         });
//     }
// };

// Get all social media entries
export const getAllSocials = async (req, res) => {
    try {
        const socials = await prisma.social.findMany();

        return res.status(200).json({
            success: true,
            message: "Social media entries fetched successfully",
            data: socials
        });

    } catch (error) {
        console.error("Error fetching social media entries:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching social media entries"
        });
    }
};

// Get a single social media entry by ID
export const getSocialById = async (req, res) => {
    const { id } = req.params;

    try {
        const social = await prisma.social.findUnique({
            where: { id }
        });

        if (!social) {
            return res.status(404).json({
                success: false,
                message: "Social media entry not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Social media entry fetched successfully",
            data: social
        });

    } catch (error) {
        console.error("Error fetching social media entry:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching the social media entry"
        });
    }
};

// Update a social media entry
export const updateSocial = async (req, res) => {
    const { id } = req.params;
    const { platform, url, isActive } = req.body;

    try {
        const existingSocial = await prisma.social.findUnique({
            where: { id }
        });

        if (!existingSocial) {
            return res.status(404).json({
                success: false,
                message: "Social media entry not found"
            });
        }

        const updatedSocial = await prisma.social.update({
            where: { id },
            data: {
                platform: platform === undefined ? existingSocial.platform : platform,
                url: url !== undefined ? url : existingSocial.url,
                isActive: isActive !== undefined ? isActive : existingSocial.isActive,
                updatedAt: new Date()
            }
        });

        return res.status(200).json({
            success: true,
            message: "Social media entry updated successfully",
            data: updatedSocial
        });

    } catch (error) {
        console.error("Error updating social media entry:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the social media entry"
        });
    }
};

// Delete a social media entry
// export const deleteSocial = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const existingSocial = await prisma.social.findUnique({
//             where: { id }
//         });

//         if (!existingSocial) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Social media entry not found"
//             });
//         }

//         await prisma.social.delete({
//             where: { id }
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Social media entry deleted successfully"
//         });

//     } catch (error) {
//         console.error("Error deleting social media entry:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while deleting the social media entry"
//         });
//     }
// }; 