import pool from "../config/postgres.js";

export interface Project {
  id: number;
  workspace_id: number;
  name: string;
  description: string | null;
  status: string;
  created_by: number | null;
  created_at: Date;
  updated_at: Date;
}

export const createProject = async (
  workspaceId: number,
  name: string,
  description: string | null,
  createdBy: number
): Promise<Project> => {
  const result = await pool.query(
    `INSERT INTO projects (workspace_id, name, description, created_by) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [workspaceId, name, description, createdBy]
  );
  return result.rows[0];
};

export const getProjectsByWorkspace = async (workspaceId: number): Promise<Project[]> => {
  const result = await pool.query(
    `SELECT p.*, 
      COUNT(DISTINCT t.id) AS task_count,
      COUNT(DISTINCT t.id) FILTER (WHERE t.status = 'done') AS completed_count
     FROM projects p
     LEFT JOIN tasks t ON t.project_id = p.id
     WHERE p.workspace_id = $1
     GROUP BY p.id
     ORDER BY p.updated_at DESC`,
    [workspaceId]
  );
  return result.rows;
};

export const getProjectById = async (id: number): Promise<Project | null> => {
  const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const addProjectMember = async (projectId: number, userId: number): Promise<void> => {
  await pool.query(
    `INSERT INTO project_members (project_id, user_id) VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [projectId, userId]
  );
};