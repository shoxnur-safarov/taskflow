import { Router } from "express";
import { inviteMember, getInvitations, getMembers } from "../controllers/invitation.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { checkWorkspaceMember, checkWorkspaceRole } from "../middleware/workspace-auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/invite", authenticate, checkWorkspaceMember, checkWorkspaceRole(["owner", "admin"]), inviteMember);
router.get("/invitations", authenticate, checkWorkspaceMember, getInvitations);
router.get("/members", authenticate, checkWorkspaceMember, getMembers);

export default router;