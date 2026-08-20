import type { Response } from "express";
import pool from "../config/postgres.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const workspaceId = Number(req.params.workspaceId);
    const userId = req.userId!;

    const [totalProjects, totalTasks, completedTasks, overdueTasks, myTasks] = await Promise.all([
      pool.query(`SELECT COUNT(*) FROM projects WHERE workspace_id = $1`, [workspaceId]),
      pool.query(
        `SELECT COUNT(*) FROM tasks t JOIN projects p ON t.project_id = p.id WHERE p.workspace_id = $1`,
        [workspaceId]
      ),
      pool.query(
        `SELECT COUNT(*) FROM tasks t JOIN projects p ON t.project_id = p.id 
         WHERE p.workspace_id = $1 AND t.status = 'done'`,
        [workspaceId]
      ),
      pool.query(
        `SELECT COUNT(*) FROM tasks t JOIN projects p ON t.project_id = p.id 
         WHERE p.workspace_id = $1 AND t.due_date < NOW() AND t.status != 'done'`,
        [workspaceId]
      ),
      pool.query(
        `SELECT t.*, pr.name AS project_name FROM tasks t 
         JOIN projects p ON t.project_id = p.id 
         LEFT JOIN projects pr ON t.project_id = pr.id
         WHERE p.workspace_id = $1 AND t.assignee_id = $2 AND t.status != 'done'
         ORDER BY t.due_date ASC NULLS LAST
         LIMIT 5`,
        [workspaceId, userId]
      ),
    ]);

    res.json({
      totalProjects: Number(totalProjects.rows[0].count),
      totalTasks: Number(totalTasks.rows[0].count),
      completedTasks: Number(completedTasks.rows[0].count),
      overdueTasks: Number(overdueTasks.rows[0].count),
      myTasks: myTasks.rows,
    });
  } catch (error) {
    console.error("Dashboard xatosi:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};