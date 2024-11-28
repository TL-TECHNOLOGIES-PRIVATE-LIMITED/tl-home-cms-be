import express from "express";

import { subscribeToNewsletter, unsubscribeFromNewsletter } from "../../controllers/newsletter.controller.js";

const router = express.Router();


// Newsletter Routes
router.post("/subscribe", subscribeToNewsletter);
router.get("/unsubscribe", unsubscribeFromNewsletter);

export default router; 