import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEmailConfig = async (req, res) => {
    const { host, port, secure, authUser, authPass } = req.body;
  
    try {
      // Create a new EmailConfig entry
      const newConfig = await prisma.emailConfig.create({
        data: {
          host,
          port,
          secure,
          authUser,
          authPass,
        },
      });
      res.status(201).json(newConfig); // Return the created configuration
    } catch (error) {
      res.status(500).json({ error: 'Error creating EmailConfig', message: error.message });
    }
  };


  export const updateEmailConfig = async (req, res) => {
    const { id } = req.params;
    const { host, port, secure, authUser, authPass } = req.body;
  
    try {
      // Update the existing EmailConfig using the id
      const updatedConfig = await prisma.emailConfig.update({
        where: { id },
        data: {
          host,
          port,
          secure,
          authUser,
          authPass,
        },
      });
      res.status(200).json(updatedConfig); // Return the updated configuration
    } catch (error) {
      res.status(500).json({ error: 'Error updating EmailConfig', message: error.message });
    }
  };



  export const getEmailConfig = async () => {
    try {
      const emailConfig = await prisma.emailConfig.findFirst();
      
      if (!emailConfig) {
        throw new Error('No email configuration found in the database');
      }
      
      return emailConfig;
    } catch (error) {
      console.error('Error fetching email config from database:', error);
      throw new Error('Could not fetch email configuration');
    }
  };