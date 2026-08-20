import { Router } from "express";
import { createLabelHandler, getLabels, deleteLabelHandler } from "../controllers/label.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { checkWorkspaceMember, checkWorkspaceRole } from "../middleware/workspace-auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/", authenticate, checkWorkspaceMember, checkWorkspaceRole(["owner", "admin"]), createLabelHandler);
router.get("/", authenticate, checkWorkspaceMember, getLabels);
router.delete("/:labelId", authenticate, checkWorkspaceMember, checkWorkspaceRole(["owner", "admin"]), deleteLabelHandler);

export default router;