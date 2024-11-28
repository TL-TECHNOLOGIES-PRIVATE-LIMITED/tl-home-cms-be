import express from "express";
import { deleteEnquiry, exportEnquiries, getAllEnquiries, getEnquirybyId, updateEnquiry } from "../../controllers/enquiries.controller.js";


const router = express.Router();

// get all enquiries ,newsletter subscribers



router.get("/get-all-enquiries", getAllEnquiries);
router.get("/get-enquiry/:id", getEnquirybyId);
router.patch("/update-status/:id", updateEnquiry);
router.delete("/delete-enquiry/:id", deleteEnquiry);
router.get("/export-enquiry", exportEnquiries);




export default router; 