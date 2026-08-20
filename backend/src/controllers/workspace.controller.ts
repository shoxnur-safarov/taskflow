import type{ Response } from "express";
import { createWorkspaceSchema } from "../validators/workspace.validator.js";
import {
  createWorkspace,
  addWorkspaceMember,
  getWorkspacesByUserId,
} from "../models/workspace.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const createWorkspaceHandler = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = createWorkspaceSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message });
    }

    const { name, description } = parsed.data;
    const userId = req.userId!;

    const workspace = await createWorkspace(name, description || null, userId);
    await addWorkspaceMember(workspace.id, userId, "owner");

    res.status(201).json({ message: "Workspace yaratildi", workspace });
  } catch (error) {
    console.error("Workspace yaratish xatosi:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const getMyWorkspaces = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const workspaces = await getWorkspacesByUserId(userId);
    res.json({ workspaces });
  } catch (error) {
    console.error("Workspace olish xatosi:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};