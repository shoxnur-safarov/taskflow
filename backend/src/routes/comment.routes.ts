import { Router } from "express";
import { addComment, getComments, removeComment } from "../controllers/comment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { checkWorkspaceMember } from "../middleware/workspace-auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/", authenticate, checkWorkspaceMember, addComment);
router.get("/", authenticate, checkWorkspaceMember, getComments);
router.delete("/:commentId", authenticate, checkWorkspaceMember, removeComment);

export default router;