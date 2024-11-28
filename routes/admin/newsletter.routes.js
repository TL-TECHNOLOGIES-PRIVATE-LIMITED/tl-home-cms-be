import express from "express";

import { sendBulkNewsletter } from "../../controllers/newsletter.controller.js";

const router = express.Router();



router.post("/send-newsletter",sendBulkNewsletter  );


export default router; 