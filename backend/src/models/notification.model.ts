import pool from "../config/postgres.js";

export const createNotification = async (
  userId: number,
  type: string,
  message: string,
  relatedTaskId: number | null = null,
  relatedProjectId: number | null = null
) => {
  const result = await pool.query(
    `INSERT INTO notifications (user_id, type, message, related_task_id, related_project_id) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [userId, type, message, relatedTaskId, relatedProjectId]
  );
  return result.rows[0];
};

export const getNotificationsByUser = async (userId: number) => {
  const result = await pool.query(
    `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
    [userId]
  );
  return result.rows;
};

export const markAsRead = async (id: number): Promise<void> => {
  await pool.query("UPDATE notifications SET is_read = true WHERE id = $1", [id]);
};

export const markAllAsRead = async (userId: number): Promise<void> => {
  await pool.query("UPDATE notifications SET is_read = true WHERE user_id = $1", [userId]);
};