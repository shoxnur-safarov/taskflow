import { Router } from "express";
import {
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/notification.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getMyNotifications);
router.patch("/:notificationId/read", authenticate, markNotificationRead);
router.patch("/read-all", authenticate, markAllNotificationsRead);

export default router;