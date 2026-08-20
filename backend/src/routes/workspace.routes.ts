import { Router } from "express";
import { createWorkspaceHandler, getMyWorkspaces } from "../controllers/workspace.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, createWorkspaceHandler);
router.get("/", authenticate, getMyWorkspaces);

export default router;