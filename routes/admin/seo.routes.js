import express from 'express';
import { getAllSEO, updateSEO } from '../../controllers/seo.controller.js';

const router = express.Router();

router.get('/get-all-seo', getAllSEO); // Get all SEO entries
router.post('/update-seo', updateSEO); // Update a SEO entry
export default router;