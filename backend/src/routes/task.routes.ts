import { Router } from "express";
import {
  createTaskHandler,
  getTasks,
  getTask,
  updateTaskHandler,
  deleteTaskHandler,
} from "../controllers/task.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { attachLabelToTask, detachLabelFromTask } from "../controllers/label.controller.js";
import { checkWorkspaceMember } from "../middleware/workspace-auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/", authenticate, checkWorkspaceMember, createTaskHandler);
router.get("/", authenticate, checkWorkspaceMember, getTasks);
router.get("/:taskId", authenticate, checkWorkspaceMember, getTask);
router.patch("/:taskId", authenticate, checkWorkspaceMember, updateTaskHandler);
router.delete("/:taskId", authenticate, checkWorkspaceMember, deleteTaskHandler);
router.post("/:taskId/labels", authenticate, checkWorkspaceMember, attachLabelToTask);
router.delete("/:taskId/labels/:labelId", authenticate, checkWorkspaceMember, detachLabelFromTask);

export default router;