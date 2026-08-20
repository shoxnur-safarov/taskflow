import type { Response } from "express";
import pool from "../config/postgres.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const globalSearch = async (req: AuthRequest, res: Response) => {
  try {
    const workspaceId = Number(req.params.workspaceId);
    const query = String(req.query.q || "").trim();

    if (!query) {
      return res.json({ projects: [], tasks: [], members: [] });
    }

    const searchPattern = `%${query}%`;

    const [projects, tasks, members] = await Promise.all([
      pool.query(
        `SELECT id, name FROM projects WHERE workspace_id = $1 AND name ILIKE $2 LIMIT 5`,
        [workspaceId, searchPattern]
      ),
      pool.query(
        `SELECT t.id, t.title, p.name AS project_name FROM tasks t
         JOIN projects p ON t.project_id = p.id
         WHERE p.workspace_id = $1 AND t.title ILIKE $2 LIMIT 5`,
        [workspaceId, searchPattern]
      ),
      pool.query(
        `SELECT u.id, u.full_name, u.email FROM workspace_members wm
         JOIN users u ON wm.user_id = u.id
         WHERE wm.workspace_id = $1 AND (u.full_name ILIKE $2 OR u.email ILIKE $2) LIMIT 5`,
        [workspaceId, searchPattern]
      ),
    ]);

    res.json({
      projects: projects.rows,
      tasks: tasks.rows,
      members: members.rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};