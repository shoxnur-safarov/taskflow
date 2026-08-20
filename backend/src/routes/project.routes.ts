import { Router } from "express";
import { createProjectHandler, getProjects } from "../controllers/project.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { getProjectActivity } from "../controllers/activity.controller.js";

const router = Router({ mergeParams: true });

router.post("/", authenticate, createProjectHandler);
router.get("/", authenticate, getProjects);
router.get("/:projectId/activity", authenticate, getProjectActivity);

export default router;