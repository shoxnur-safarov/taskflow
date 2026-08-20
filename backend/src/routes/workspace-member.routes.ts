import { Router } from "express";
import { inviteMember, getInvitations, getMembers } from "../controllers/invitation.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/invite", authenticate, inviteMember);
router.get("/invitations", authenticate, getInvitations);
router.get("/members", authenticate, getMembers);

export default router;