import express from "express";
import { createClient, getAllClients, updateClient, deleteClient } from "../../controllers/client.controller.js";
import upload from "../../middlewares/upload.middleware.js";
import verifyJwtToken from "../../middlewares/verifyJwtToken.js";

const router = express.Router();

router.post("/create-client", verifyJwtToken, upload.single("logo"), createClient);
router.get("/get-all-clients", getAllClients);
router.put("/update-client/:id", verifyJwtToken, upload.single("logo"), updateClient);
router.delete("/delete-client/:id", verifyJwtToken, deleteClient);

export default router; 