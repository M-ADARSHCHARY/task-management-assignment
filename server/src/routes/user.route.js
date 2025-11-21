import express from 'express';
import { checkAuth, getUserProfile, userLogin, userLogout, userSignup } from '../controllers/user.controller.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
const router = express.Router();



router.post("/signup", userSignup);

router.post("/login", userLogin);

router.get("/profile", authenticateUser, getUserProfile) // Protected Route

router.post("/logout", authenticateUser, userLogout);

router.get("/check-auth", authenticateUser, checkAuth);

export default router;
