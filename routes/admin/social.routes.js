import express from 'express';
import {
    // createSocial,
    getAllSocials,
    getSocialById,
    updateSocial,
    // deleteSocial
} from '../../controllers/social.controller.js';

const router = express.Router();

// Admin routes
// router.post('/create-social', createSocial); // Create a new social media entry
router.get('/get-social', getAllSocials); // Get all social media entries
router.get('/get-social/:id', getSocialById); // Get a single social media entry by ID
router.put('/update-social/:id', updateSocial); // Update a social media entry
// router.delete('/delete-social/:id', deleteSocial); // Delete a social media entry

export default router;