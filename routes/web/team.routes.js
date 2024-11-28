import express from "express";
import { addTeam, getActiveTeam, getAllTeam} from "../../controllers/team.controller.js";
import upload from "../../middlewares/upload.middleware.js";
import verifyJwtToken from "../../middlewares/verifyJwtToken.js";


const router = express.Router();

router.get('/active-team',getActiveTeam)

export default router;