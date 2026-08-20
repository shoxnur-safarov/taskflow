import type { Response } from "express";
import { getActivityByProject } from "../models/activity.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const getProjectActivity = async (req: AuthRequest, res: Response) => {
  try {
    const projectId = Number(req.params.projectId);
    const activity = await getActivityByProject(projectId);
    res.json({ activity });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};