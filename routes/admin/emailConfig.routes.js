import express from "express";

import verifyjwtToken from "../../middlewares/verifyJwtToken.js";
import { createEmailConfig, updateEmailConfig } from "../../controllers/emailConfig.controller.js";



const router = express.Router();

router.post('/email-config',createEmailConfig)
router.put('/email-config/:id',updateEmailConfig)






export default router;