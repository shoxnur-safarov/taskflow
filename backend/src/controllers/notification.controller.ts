import type { Response } from "express";
import { getNotificationsByUser, markAsRead, markAllAsRead } from "../models/notification.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const getMyNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await getNotificationsByUser(req.userId!);
    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const markNotificationRead = async (req: AuthRequest, res: Response) => {
  try {
    await markAsRead(Number(req.params.notificationId));
    res.json({ message: "O'qilgan deb belgilandi" });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const markAllNotificationsRead = async (req: AuthRequest, res: Response) => {
  try {
    await markAllAsRead(req.userId!);
    res.json({ message: "Barchasi o'qilgan deb belgilandi" });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};