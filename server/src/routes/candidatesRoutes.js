import express from 'express';
import addCandidate from '../controllers/candidates/add/addCandidates.js';
import authMiddleware from '../util/auth.js';
import upload from '../util/multer.js';
import getAllcandidates from '../controllers/candidates/getcandidates/getAllcandidates.js';
import updateCandidate from '../controllers/candidates/update/updateCandidate.js';
import deleteCandidate from '../controllers/candidates/delete/deleteCandidates.js';
import getCandidateById from '../controllers/candidates/getcandidates/getCandidateById.js';
const router=express.Router();

router.use(authMiddleware);
router.post("/add", upload.single("resumeUrl"), addCandidate);
router.get("/", getAllcandidates);
router.get("/:id", getCandidateById);
router.put("/:id", updateCandidate);
router.delete("/:id",deleteCandidate);

export default router
