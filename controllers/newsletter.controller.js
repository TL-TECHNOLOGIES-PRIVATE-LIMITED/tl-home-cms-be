import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { sendNewsletterEmail } from "../helpers/email.js";
import crypto from 'crypto';



const prisma = new PrismaClient();
 function generateunSubscribeToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
}

export const subscribeToNewsletter = async (req, res) => {
    const { email } = req.body;

    // Validate email
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    try {
        // Check if email already exists
        const existingSubscription = await prisma.newsletter.findUnique({
            where: { email }
        });

        if (existingSubscription) {
            return res.status(400).json({
                success: false,
                message: "This email is already subscribed to our newsletter"
            });
        }

        // Generate a unique unsubscribe token using the custom function
        const unSubscribeToken = generateunSubscribeToken();  

        // Create new subscription with unsubscribe token
        const subscription = await prisma.newsletter.create({
            data: {
                id: uuidv4(),
                email,
                unSubscribeToken,  // Store the generated unsubscribe token
            }
        });

        return res.status(201).json({
            success: true,
            message: "Successfully subscribed to the newsletter",
            data: subscription
        });

    } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while subscribing to the newsletter"
        });
    }
};

export const unsubscribeFromNewsletter = async (req, res) => {
    const { token } = req.query;

    // Check if the token is provided
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token is required"
        });
    }

    try {
        // Find the subscriber using the token
        const subscriber = await prisma.newsletter.findUnique({
            where: { unSubscribeToken: token }
        });

        // If the subscriber does not exist, return an error
        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: "Subscriber not found"
            });
        }

        // Delete the subscriber from the database
        await prisma.newsletter.delete({
            where: { unSubscribeToken: token }
        });

        // Respond with a success message
        return res.status(200).json({
            success: true,
            message: "You have successfully unsubscribed from the newsletter"
        });
        
    } catch (error) {
        console.error("Error unsubscribing from newsletter:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while unsubscribing"
        });
    }
}; 


export const sendBulkNewsletter = async (req, res) => {
    const { subject, content } = req.body;
    const BATCH_SIZE = 100;  
    const DELAY_BETWEEN_EMAILS = 1000; 

    try {
        // Fetch all subscribers from the database
        const subscribers = await prisma.newsletter.findMany();
        
        if (!subscribers || subscribers.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No subscribers found"
            });
        }

        const results = {
            successful: [],
            failed: [],
            totalProcessed: 0
        };

        // Process subscribers in batches
        for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
            const batch = subscribers.slice(i, i + BATCH_SIZE);
            
            // Send to each subscriber in the batch
            for (const subscriber of batch) {
                try {
                    // Generate the unsubscribe URL with the token
                    const unsubscribeUrl = `http://localhost:8080/api/v1/web/newsletter/unsubscribe?token=${subscriber.unSubscribeToken}`;

                    // Replace the unsubscribe token placeholder in the content

                    await sendNewsletterEmail({
                        to: subscriber.email,
                        subject,
                        content,
                        unsubscribeUrl
                    });
                    
                    results.successful.push(subscriber.email);
                    
                } catch (error) {
                    results.failed.push({
                        email: subscriber.email,
                        error: error.message
                    });
                    console.error(`❌ Failed to send newsletter to ${subscriber.email}:`, error.message);
                }

                results.totalProcessed++;
                
                // Delay between emails to avoid rate limits
                await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_EMAILS));
            }

            // If not the last batch, add a longer delay between batches
            if (i + BATCH_SIZE < subscribers.length) {
                await new Promise(resolve => setTimeout(resolve, 1000 * 60 * 2)); // 2 minutes between batches
            }
        }

        return res.status(200).json({
            success: true,
            message: "Newsletter sending process completed",
            details: {
                totalSubscribers: subscribers.length,
                successfulSends: results.successful.length,
                failedSends: results.failed.length,
                successful: results.successful,
                failed: results.failed
            }
        });

    } catch (error) {
        console.error("Error in newsletter sending process:", error);
        return res.status(500).json({
            success: false,
            message: "Error sending newsletter",
            error: error.message
        });
    }
};

