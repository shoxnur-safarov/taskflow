import pool from "../config/postgres.js";

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  assignee_id: number | null;
  due_date: Date | null;
  created_by: number | null;
  created_at: Date;
  updated_at: Date;
}

export const createTask = async (
  projectId: number,
  title: string,
  description: string | null,
  priority: string,
  assigneeId: number | null,
  dueDate: string | null,
  createdBy: number
): Promise<Task> => {
  const result = await pool.query(
    `INSERT INTO tasks (project_id, title, description, priority, assignee_id, due_date, created_by) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) 
     RETURNING *`,
    [projectId, title, description, priority, assigneeId, dueDate, createdBy]
  );
  return result.rows[0];
};

export const getTasksByProject = async (projectId: number) => {
  const result = await pool.query(
    `SELECT t.*, u.full_name AS assignee_name, u.avatar_url AS assignee_avatar
     FROM tasks t
     LEFT JOIN users u ON t.assignee_id = u.id
     WHERE t.project_id = $1
     ORDER BY t.created_at DESC`,
    [projectId]
  );
  return result.rows;
};

export const getTaskById = async (id: number) => {
  const result = await pool.query(
    `SELECT t.*, u.full_name AS assignee_name, u.avatar_url AS assignee_avatar
     FROM tasks t
     LEFT JOIN users u ON t.assignee_id = u.id
     WHERE t.id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

export const updateTask = async (id: number, fields: Partial<Task>) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  if (keys.length === 0) return getTaskById(id);

  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");

  const result = await pool.query(
    `UPDATE tasks SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
};

export const deleteTask = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
};