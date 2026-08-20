import pool from "../config/postgres.js";

export interface User {
  id: number;
  full_name: string;
  email: string;
  password_hash: string;
  avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const createUser = async (
  fullName: string,
  email: string,
  passwordHash: string
): Promise<User> => {
  const result = await pool.query(
    `INSERT INTO users (full_name, email, password_hash) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [fullName, email, passwordHash]
  );
  return result.rows[0];
};