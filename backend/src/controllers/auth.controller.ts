import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { findUserByEmail, createUser } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message });
    }

    const { fullName, email, password } = parsed.data;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Bu email allaqachon ro'yxatdan o'tgan" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(fullName, email, passwordHash);

    const token = generateToken({ userId: user.id, email: user.email });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "Ro'yxatdan o'tish muvaffaqiyatli",
        user: { id: user.id, fullName: user.full_name, email: user.email },
      });
  } catch (error) {
    console.error("Register xatosi:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message });
    }

    const { email, password } = parsed.data;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Email yoki parol noto'g'ri" });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Email yoki parol noto'g'ri" });
    }

    const token = generateToken({ userId: user.id, email: user.email });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login muvaffaqiyatli",
        user: { id: user.id, fullName: user.full_name, email: user.email },
      });
  } catch (error) {
    console.error("Login xatosi:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};