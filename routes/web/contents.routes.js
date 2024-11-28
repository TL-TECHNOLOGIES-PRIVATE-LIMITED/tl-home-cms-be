import express from "express";
import { getAllTestimonials } from "../../controllers/testimonials.controller.js";
import { getAllPrivacyPolicies} from "../../controllers/privacyPolicy.controller.js";

const router = express.Router();


router.get("/testimonials", getAllTestimonials);
// Privacy Policy routes


router.get("/get-policies", getAllPrivacyPolicies);

export default router; 