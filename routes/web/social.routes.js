import express from 'express';
import { getAllSocials } from '../../controllers/social.controller.js';

const router = express.Router();

// Web routes
router.get('/get-social', getAllSocials); // Get all social media entries for web

export default router;