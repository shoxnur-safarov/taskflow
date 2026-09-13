import pool from "../config/postgres.js";

export const createAttachment = async (
  taskId: number,
  fileName: string,
  fileUrl: string,
  fileSize: number,
  fileType: string,
  uploadedBy: number
) => {
  const result = await pool.query(
    `INSERT INTO attachments (task_id, file_name, file_url, file_size, file_type, uploaded_by) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [taskId, fileName, fileUrl, fileSize, fileType, uploadedBy]
  );
  return result.rows[0];
};

export const getAttachmentsByTask = async (taskId: number) => {
  const result = await pool.query(
    `SELECT a.*, u.full_name AS uploaded_by_name
     FROM attachments a
     LEFT JOIN users u ON a.uploaded_by = u.id
     WHERE a.task_id = $1
     ORDER BY a.created_at DESC`,
    [taskId]
  );
  return result.rows;
};

export const getAttachmentById = async (id: number) => {
  const result = await pool.query("SELECT * FROM attachments WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const deleteAttachment = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM attachments WHERE id = $1", [id]);
};