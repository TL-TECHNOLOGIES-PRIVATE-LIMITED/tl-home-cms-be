import express from "express";
import { 
    createCatalogue, 
    getAllCatalogues, 
    getCatalogueById,
    updateCatalogue, 
    deleteCatalogue 
} from "../../controllers/catalogue.controller.js";
import upload from "../../middlewares/upload.middleware.js";
import verifyJwtToken from "../../middlewares/verifyJwtToken.js";

const router = express.Router();

// Admin routes with authentication and file upload middleware
router.post("/create-catalogue", 
    verifyJwtToken, 
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'document', maxCount: 1 }
    ]), 
    createCatalogue
);

router.get("/get-all-catalogues", verifyJwtToken, getAllCatalogues);
router.get("/get-catalogue/:id", verifyJwtToken, getCatalogueById);

router.put("/update-catalogue/:id", 
    verifyJwtToken, 
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'document', maxCount: 1 }
    ]), 
    updateCatalogue
);

router.delete("/delete-catalogue/:id", verifyJwtToken, deleteCatalogue);

export default router; 