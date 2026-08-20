import type { Response, NextFunction } from "express";
import pool from "../config/postgres.js";
import type { AuthRequest } from "./auth.middleware.js";

export const checkWorkspaceMember = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspaceId = Number(req.params.workspaceId);
    const userId = req.userId!;

    const result = await pool.query(
      `SELECT role FROM workspace_members WHERE workspace_id = $1 AND user_id = $2`,
      [workspaceId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Siz bu workspace a'zosi emassiz" });
    }

    req.userRole = result.rows[0].role;
    next();
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const checkWorkspaceRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userRole || !allowedRoles.includes(req.userRole)) {
      return res.status(403).json({ error: "Bu amal uchun ruxsatingiz yo'q" });
    }
    next();
  };
};