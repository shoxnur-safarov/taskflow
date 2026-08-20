import pool from "../config/postgres.js";

export const createComment = async (taskId: number, userId: number, content: string) => {
  const result = await pool.query(
    `INSERT INTO comments (task_id, user_id, content) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [taskId, userId, content]
  );
  return result.rows[0];
};

export const getCommentsByTask = async (taskId: number) => {
  const result = await pool.query(
    `SELECT c.*, u.full_name AS user_name, u.avatar_url AS user_avatar
     FROM comments c
     LEFT JOIN users u ON c.user_id = u.id
     WHERE c.task_id = $1
     ORDER BY c.created_at ASC`,
    [taskId]
  );
  return result.rows;
};

export const deleteComment = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM comments WHERE id = $1", [id]);
};