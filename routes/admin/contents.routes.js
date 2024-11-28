import express from "express";
import { createTestimonial, getAllTestimonials, updateTestimonial, deleteTestimonial } from "../../controllers/testimonials.controller.js";
import { createPrivacyPolicy, getAllPrivacyPolicies, updatePrivacyPolicy, deletePrivacyPolicy } from "../../controllers/privacyPolicy.controller.js";
import verifyJwtToken from "../../middlewares/verifyJwtToken.js";

const router = express.Router();

// Testimonial routes
router.post("/testimonial", verifyJwtToken, createTestimonial);
router.get("/testimonials", getAllTestimonials);
router.put("/testimonial/:id", verifyJwtToken, updateTestimonial);
router.delete("/testimonial/:id", verifyJwtToken, deleteTestimonial);

// Privacy Policy routes
router.post("/create-policy", verifyJwtToken, createPrivacyPolicy);
router.get("/get-policies", getAllPrivacyPolicies);
router.put("/update-policy/:id", verifyJwtToken, updatePrivacyPolicy);
router.delete("/delete-policy/:id", verifyJwtToken, deletePrivacyPolicy);

export default router; 