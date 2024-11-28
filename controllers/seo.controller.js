import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all SEO entries
export const getAllSEO = async (req, res) => {
    try {
        const seoEntries = await prisma.sEO.findMany();
        return res.status(200).json({
            success: true,
            message: "SEO entries fetched successfully",
            data: seoEntries
        });
    } catch (error) {
        console.error("Error fetching SEO entries:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching SEO entries"
        });
    }
};

export const updateSEO = async (req, res) => {
    const { id } = req.params;
    const {
        pageTitle,
        title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        ogImage,
        ogType,
        twitterCard,
        twitterTitle,
        twitterDescription,
        twitterImage
    } = req.body;

    // Validate required fields
    if (!pageTitle || !title || !description) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields (pageTitle, title, description)"
        });
    }

    try {
        // Check if SEO entry exists
        const existingSEO = await prisma.sEO.findUnique({
            where: { id }
        });

        if (!existingSEO) {
            return res.status(404).json({
                success: false,
                message: "SEO entry not found"
            });
        }

        // Update SEO entry
        const updatedSEO = await prisma.sEO.update({
            where: { id },
            data: {
                pageTitle,
                title,
                description,
                keywords,
                ogTitle,
                ogDescription,
                ogImage,
                ogType,
                twitterCard,
                twitterTitle,
                twitterDescription,
                twitterImage,
                updatedAt: new Date()
            }
        });

        return res.status(200).json({
            success: true,
            message: "SEO entry updated successfully",
            data: updatedSEO
        });

    } catch (error) {
        console.error("Error updating SEO entry:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the SEO entry"
        });
    }
};