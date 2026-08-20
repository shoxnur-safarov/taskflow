import type { Response } from "express";
import { createProjectSchema } from "../validators/project.validator.js";
import { createProject, getProjectsByWorkspace, addProjectMember } from "../models/project.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const createProjectHandler = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = createProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message });
    }

    const { name, description, memberIds } = parsed.data;
    const workspaceId = Number(req.params.workspaceId);
    const userId = req.userId!;

    const project = await createProject(workspaceId, name, description || null, userId);

    // Yaratuvchini avtomatik a'zo qilamiz
    await addProjectMember(project.id, userId);

    // Qo'shimcha a'zolar bo'lsa, ularni ham qo'shamiz
    if (memberIds && memberIds.length > 0) {
      for (const memberId of memberIds) {
        await addProjectMember(project.id, memberId);
      }
    }

    res.status(201).json({ message: "Loyiha yaratildi", project });
  } catch (error) {
    console.error("Loyiha yaratish xatosi:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const workspaceId = Number(req.params.workspaceId);
    const projects = await getProjectsByWorkspace(workspaceId);
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};