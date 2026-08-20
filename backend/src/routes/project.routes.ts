import { Router } from "express";
import { createProjectHandler, getProjects } from "../controllers/project.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { getProjectActivity } from "../controllers/activity.controller.js";
import { checkWorkspaceMember } from "../middleware/workspace-auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/", authenticate, checkWorkspaceMember, createProjectHandler);
router.get("/", authenticate, checkWorkspaceMember, getProjects);
router.get("/:projectId/activity", authenticate, checkWorkspaceMember, getProjectActivity);

export default router;