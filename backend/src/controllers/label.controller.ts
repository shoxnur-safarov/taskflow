import type { Response } from "express";
import { createLabelSchema } from "../validators/label.validator.js";
import {
  createLabel,
  getLabelsByWorkspace,
  deleteLabel,
  addLabelToTask,
  removeLabelFromTask,
} from "../models/label.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const createLabelHandler = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = createLabelSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message });
    }

    const workspaceId = Number(req.params.workspaceId);
    const label = await createLabel(workspaceId, parsed.data.name, parsed.data.color);
    res.status(201).json({ message: "Label yaratildi", label });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "Bu nomda label allaqachon mavjud" });
    }
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const getLabels = async (req: AuthRequest, res: Response) => {
  try {
    const workspaceId = Number(req.params.workspaceId);
    const labels = await getLabelsByWorkspace(workspaceId);
    res.json({ labels });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const deleteLabelHandler = async (req: AuthRequest, res: Response) => {
  try {
    const labelId = Number(req.params.labelId);
    await deleteLabel(labelId);
    res.json({ message: "Label o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const attachLabelToTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.taskId);
    const { labelId } = req.body;
    await addLabelToTask(taskId, labelId);
    res.json({ message: "Label vazifaga biriktirildi" });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const detachLabelFromTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.taskId);
    const labelId = Number(req.params.labelId);
    await removeLabelFromTask(taskId, labelId);
    res.json({ message: "Label vazifadan olib tashlandi" });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};