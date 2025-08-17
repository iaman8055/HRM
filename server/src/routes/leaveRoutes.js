import express from "express";
import upload from "../util/multer.js";
import addLeave from "../controllers/leaves/add/addLeave.js";
import authMiddleware from "../util/auth.js";
import updateLeave from "../controllers/leaves/update/updateLeave.js";
import getAllLeaves from "../controllers/leaves/getleaves/getAllleaves.js";

const router = express.Router();
router.use(authMiddleware);
router.get("/", getAllLeaves);
router.post("/add", upload.single("docs"), addLeave);
router.put("/:leaveId", upload.single("docs"), updateLeave);

export default router;
