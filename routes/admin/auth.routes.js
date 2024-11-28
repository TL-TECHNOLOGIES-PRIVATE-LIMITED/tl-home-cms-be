import express from "express";
import { changePassword, forgotPassword, login, register, resetPassword,  verifyOtp } from "../../controllers/auth.controller.js";
import verifyjwtToken from "../../middlewares/verifyJwtToken.js";
import upload from "../../middlewares/upload.middleware.js";



const router = express.Router();



//auth routes
router.post("/register", register)
router.post("/login",login)
router.post("/change-password",verifyjwtToken,changePassword) // needs jwt token
router.post("/forgot-password",forgotPassword)
router.post('/verify-otp',verifyOtp)
router.post('/reset-password',resetPassword)


export default router;