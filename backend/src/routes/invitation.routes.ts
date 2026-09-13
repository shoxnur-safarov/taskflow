import { Router } from "express";
import { acceptInvitation } from "../controllers/invitation.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:token/accept", authenticate, acceptInvitation);

export default router;