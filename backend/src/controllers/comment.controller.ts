import type { Response } from "express";
import { createCommentSchema } from "../validators/comment.validator.js";
import { createComment, getCommentsByTask, deleteComment } from "../models/comment.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const addComment = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = createCommentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message });
    }

    const taskId = Number(req.params.taskId);
    const userId = req.userId!;

    const comment = await createComment(taskId, userId, parsed.data.content);
    res.status(201).json({ message: "Izoh qo'shildi", comment });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const getComments = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.taskId);
    const comments = await getCommentsByTask(taskId);
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  } 
};

export const removeComment = async (req: AuthRequest, res: Response) => {
  try {
    const commentId = Number(req.params.commentId);
    await deleteComment(commentId);
    res.json({ message: "Izoh o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};