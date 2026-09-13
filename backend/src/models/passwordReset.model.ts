import pool from "../config/postgres.js";
import crypto from "crypto";

export const createResetToken = async (userId: number) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // 1 soat

  await pool.query(
    `INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)`,
    [userId, token, expiresAt]
  );

  return token;
};

export const getResetToken = async (token: string) => {
  const result = await pool.query(
    `SELECT * FROM password_reset_tokens WHERE token = $1`,
    [token]
  );
  return result.rows[0] || null;
};

export const markTokenAsUsed = async (id: number) => {
  await pool.query(`UPDATE password_reset_tokens SET used = true WHERE id = $1`, [id]);
};