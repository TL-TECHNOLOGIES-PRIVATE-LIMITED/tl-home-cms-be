import express from "express";
import { createBlog, getAllBlogs, updateBlog, deleteBlog } from "../../controllers/blog.controller.js";
import upload from "../../middlewares/upload.middleware.js";

const router = express.Router();


router.get("/get-all-blogs", getAllBlogs);

export default router;