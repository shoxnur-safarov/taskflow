import { Router } from "express";
import { createProjectHandler, getProjects } from "../controllers/project.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/", authenticate, createProjectHandler);
router.get("/", authenticate, getProjects);

export default router;