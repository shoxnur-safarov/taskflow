import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.controller.js";
import { loginLimiter } from "../middleware/rateLimiter.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.get("/me", authenticate, getMe);

export default router;