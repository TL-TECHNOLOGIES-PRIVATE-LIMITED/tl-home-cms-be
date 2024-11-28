import express from "express";
import { getAllClients } from "../../controllers/client.controller.js";


const router = express.Router();


router.get("/get-all-clients", getAllClients);


export default router; 