import express from "express";
import { createContactEnquiry } from "../../controllers/enquiries.controller.js";

const router = express.Router();

router.post("/create-enquiry", createContactEnquiry);



export default router; 