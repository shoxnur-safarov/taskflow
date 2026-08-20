import { Router } from "express";
import {
  createTaskHandler,
  getTasks,
  getTask,
  updateTaskHandler,
  deleteTaskHandler,
} from "../controllers/task.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/", authenticate, createTaskHandler);
router.get("/", authenticate, getTasks);
router.get("/:taskId", authenticate, getTask);
router.patch("/:taskId", authenticate, updateTaskHandler);
router.delete("/:taskId", authenticate, deleteTaskHandler);

export default router;