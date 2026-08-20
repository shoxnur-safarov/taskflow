import pool from "../config/postgres.js";

export const createActivityLog = async (
  workspaceId: number,
  userId: number | null,
  actionType: string,
  description: string,
  projectId: number | null = null,
  taskId: number | null = null
) => {
  const result = await pool.query(
    `INSERT INTO activity_logs (workspace_id, project_id, task_id, user_id, action_type, description) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [workspaceId, projectId, taskId, userId, actionType, description]
  );
  return result.rows[0];
};

export const getActivityByProject = async (projectId: number) => {
  const result = await pool.query(
    `SELECT a.*, u.full_name AS user_name, u.avatar_url AS user_avatar
     FROM activity_logs a
     LEFT JOIN users u ON a.user_id = u.id
     WHERE a.project_id = $1
     ORDER BY a.created_at DESC
     LIMIT 50`,
    [projectId]
  );
  return result.rows;
};