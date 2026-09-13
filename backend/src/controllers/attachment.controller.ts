import type { Response } from "express";
import { put, del } from "@vercel/blob";
import {
    createAttachment,
    getAttachmentsByTask,
    getAttachmentById,
    deleteAttachment,
} from "../models/attachment.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const uploadAttachment = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.taskId);
    const userId = req.userId!;
    const file = (req as any).file;

    if (!file) {
      return res.status(400).json({ error: "Fayl yuklanmadi" });
    }

    const blob = await put(file.originalname, file.buffer, {
      access: "public",
      addRandomSuffix: true,
    });

    const attachment = await createAttachment(
      taskId,
      file.originalname,
      blob.url,
      file.size,
      file.mimetype,
      userId
    );

    res.status(201).json({ message: "Fayl yuklandi", attachment });
  } catch (error) {
    console.error("Fayl yuklash xatosi:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const getAttachments = async (req: AuthRequest, res: Response) => {
    try {
        const taskId = Number(req.params.taskId);
        const attachments = await getAttachmentsByTask(taskId);
        res.json({ attachments });
    } catch (error) {
        res.status(500).json({ error: "Server xatosi" });
    }
};

export const removeAttachment = async (req: AuthRequest, res: Response) => {
    try {
        const attachmentId = Number(req.params.attachmentId);
        const attachment = await getAttachmentById(attachmentId);

        if (!attachment) {
            return res.status(404).json({ error: "Fayl topilmadi" });
        }

        await del(attachment.file_url);
        await deleteAttachment(attachmentId);

        res.json({ message: "Fayl o'chirildi" });
    } catch (error) {
        res.status(500).json({ error: "Server xatosi" });
    }
};