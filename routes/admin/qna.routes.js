import express from "express";
import { createFAQ, getAllFAQs, updateFAQ, deleteFAQ } from "../../controllers/faq.controller.js";
import verifyJwtToken from "../../middlewares/verifyJwtToken.js";

const router = express.Router();

// Add these routes with your existing routes
router.post("/create-faq", verifyJwtToken, createFAQ);
router.get("/get-faqs", getAllFAQs);
router.put("/update-faq/:id", verifyJwtToken, updateFAQ);
router.delete("/delete-faq/:id", verifyJwtToken, deleteFAQ);

export default router;