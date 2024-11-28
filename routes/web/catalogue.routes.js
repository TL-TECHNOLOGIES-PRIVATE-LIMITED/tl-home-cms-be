import express from "express";
import { getAllCatalogues, getCatalogueById } from "../../controllers/catalogue.controller.js";

const router = express.Router();

// Public routes for accessing catalogues
router.get("/get-all-catalogues", getAllCatalogues);
router.get("/get-catalogue/:id", getCatalogueById);

export default router; 