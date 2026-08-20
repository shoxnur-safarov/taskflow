import pool from "../config/postgres.js";
import crypto from "crypto";

export interface Invitation {
  id: number;
  workspace_id: number;
  email: string;
  role: string;
  token: string;
  status: string;
  invited_by: number | null;
  expires_at: Date;
  created_at: Date;
}

export const createInvitation = async (
  workspaceId: number,
  email: string,
  role: string,
  invitedBy: number
): Promise<Invitation> => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 kundan keyin eskiradi

  const result = await pool.query(
    `INSERT INTO invitations (workspace_id, email, role, token, invited_by, expires_at) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [workspaceId, email, role, token, invitedBy, expiresAt]
  );
  return result.rows[0];
};

export const getInvitationsByWorkspace = async (workspaceId: number): Promise<Invitation[]> => {
  const result = await pool.query(
    `SELECT * FROM invitations WHERE workspace_id = $1 ORDER BY created_at DESC`,
    [workspaceId]
  );
  return result.rows;
};

export const getInvitationByToken = async (token: string): Promise<Invitation | null> => {
  const result = await pool.query("SELECT * FROM invitations WHERE token = $1", [token]);
  return result.rows[0] || null;
};

export const updateInvitationStatus = async (id: number, status: string): Promise<void> => {
  await pool.query("UPDATE invitations SET status = $1 WHERE id = $2", [status, id]);
};

export const getWorkspaceMembers = async (workspaceId: number) => {
  const result = await pool.query(
    `SELECT u.id, u.full_name, u.email, u.avatar_url, wm.role, wm.joined_at
     FROM workspace_members wm
     JOIN users u ON wm.user_id = u.id
     WHERE wm.workspace_id = $1
     ORDER BY wm.joined_at ASC`,
    [workspaceId]
  );
  return result.rows;
};