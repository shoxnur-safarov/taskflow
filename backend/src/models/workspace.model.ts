import pool from "../config/postgres.js";

export interface Workspace {
  id: number;
  name: string;
  description: string | null;
  owner_id: number;
  created_at: Date;
  updated_at: Date;
}

export const createWorkspace = async (
  name: string,
  description: string | null,
  ownerId: number
): Promise<Workspace> => {
  const result = await pool.query(
    `INSERT INTO workspaces (name, description, owner_id) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [name, description, ownerId]
  );
  return result.rows[0];
};

export const addWorkspaceMember = async (
  workspaceId: number,
  userId: number,
  role: string
): Promise<void> => {
  await pool.query(
    `INSERT INTO workspace_members (workspace_id, user_id, role) 
     VALUES ($1, $2, $3)`,
    [workspaceId, userId, role]
  );
};

export const getWorkspacesByUserId = async (userId: number): Promise<Workspace[]> => {
  const result = await pool.query(
    `SELECT w.* FROM workspaces w
     JOIN workspace_members wm ON w.id = wm.workspace_id
     WHERE wm.user_id = $1
     ORDER BY w.created_at DESC`,
    [userId]
  );
  return result.rows;
};

export const getWorkspaceById = async (id: number): Promise<Workspace | null> => {
  const result = await pool.query("SELECT * FROM workspaces WHERE id = $1", [id]);
  return result.rows[0] || null;
};