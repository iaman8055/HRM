import express from 'express';
import signup from '../controllers/auth/signup/signup.js';
import login from '../controllers/auth/login/login.js';
const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);

export default router;