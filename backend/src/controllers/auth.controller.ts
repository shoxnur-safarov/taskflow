import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { findUserByEmail, createUser, findUserById } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";
import { createResetToken, getResetToken, markTokenAsUsed } from "../models/passwordReset.model.js";
import { sendPasswordResetEmail } from "../utils/email.js";
import pool from "../config/postgres.js";

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
  export const getMe = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const user = await findUserById(userId);
  
  if (!user) {
    return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
  }

  res.json({
    user: { id: user.id, fullName: user.full_name, email: user.email },
  });
};
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email kiritilishi shart" });
    }

    const user = await findUserByEmail(email);

    // Xavfsizlik uchun: user topilmasa ham, xuddi shunday javob qaytaramiz
    // (bu orqali "qaysi email ro'yxatdan o'tgan" ma'lumotini oshkor qilmaymiz)
    if (user) {
      const token = await createResetToken(user.id);
      await sendPasswordResetEmail(user.email, token);
    }

    res.json({ message: "Agar email ro'yxatdan o'tgan bo'lsa, tiklash havolasi yuborildi" });
  } catch (error) {
    console.error("Forgot password xatosi:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: "Token va parol kiritilishi shart" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" });
    }

    const resetToken = await getResetToken(token);

    if (!resetToken) {
      return res.status(400).json({ error: "Token yaroqsiz" });
    }

    if (resetToken.used) {
      return res.status(400).json({ error: "Bu token allaqachon ishlatilgan" });
    }

    if (new Date(resetToken.expires_at) < new Date()) {
      return res.status(400).json({ error: "Token muddati tugagan" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      passwordHash,
      resetToken.user_id,
    ]);

    await markTokenAsUsed(resetToken.id);

    res.json({ message: "Parol muvaffaqiyatli yangilandi" });
  } catch (error) {
    console.error("Reset password xatosi:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};