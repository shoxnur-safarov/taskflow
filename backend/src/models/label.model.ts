import pool from "../config/postgres.js";

export const createLabel = async (workspaceId: number, name: string, color: string) => {
  const result = await pool.query(
    `INSERT INTO labels (workspace_id, name, color) VALUES ($1, $2, $3) RETURNING *`,
    [workspaceId, name, color]
  );
  return result.rows[0];
};

export const getLabelsByWorkspace = async (workspaceId: number) => {
  const result = await pool.query(
    `SELECT * FROM labels WHERE workspace_id = $1 ORDER BY name ASC`,
    [workspaceId]
  );
  return result.rows;
};

export const deleteLabel = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM labels WHERE id = $1", [id]);
};

export const addLabelToTask = async (taskId: number, labelId: number) => {
  await pool.query(
    `INSERT INTO task_labels (task_id, label_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
    [taskId, labelId]
  );    
};

export const removeLabelFromTask = async (taskId: number, labelId: number) => {
  await pool.query(`DELETE FROM task_labels WHERE task_id = $1 AND label_id = $2`, [taskId, labelId]);
};

export const getLabelsByTask = async (taskId: number) => {
  const result = await pool.query(
    `SELECT l.* FROM labels l
     JOIN task_labels tl ON l.id = tl.label_id
     WHERE tl.task_id = $1`,
    [taskId]
  );
  return result.rows;
};