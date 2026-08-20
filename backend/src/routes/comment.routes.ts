import { Router } from "express";
import { addComment, getComments, removeComment } from "../controllers/comment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/", authenticate, addComment);
router.get("/", authenticate, getComments);
router.delete("/:commentId", authenticate, removeComment);

export default router;