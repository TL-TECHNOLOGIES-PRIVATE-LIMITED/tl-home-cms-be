import express from "express";
import { addTeam, deleteTeamMember, getAllTeam, updateTeam} from "../../controllers/team.controller.js";
import upload from "../../middlewares/upload.middleware.js";
import verifyJwtToken from "../../middlewares/verifyJwtToken.js";


const router = express.Router();

router.post('/add-team',verifyJwtToken,upload.single('image'),addTeam);
router.get('/all-team',verifyJwtToken,getAllTeam)
router.put('/update-team/:id',upload.single('image'),updateTeam)
router.delete('/delete-team/:id',deleteTeamMember)

export default router;