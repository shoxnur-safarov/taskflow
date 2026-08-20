import type { Response } from "express";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validator.js";
import { createTask, getTasksByProject, getTaskById, updateTask, deleteTask } from "../models/task.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const createTaskHandler = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message });
    }

    const { title, description, priority, assigneeId, dueDate } = parsed.data;
    const projectId = Number(req.params.projectId);
    const userId = req.userId!;

    const task = await createTask(
      projectId,
      title,
      description || null,
      priority || "medium",
      assigneeId || null,
      dueDate || null,
      userId
    );

    res.status(201).json({ message: "Vazifa yaratildi", task });
  } catch (error) {
    console.error("Vazifa yaratish xatosi:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const projectId = Number(req.params.projectId);
    const tasks = await getTasksByProject(projectId);
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const getTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.taskId);
    const task = await getTaskById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Vazifa topilmadi" });
    }

    res.json({ task });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const updateTaskHandler = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = updateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message });
    }

    const taskId = Number(req.params.taskId);

    // camelCase'dan database'ning snake_case ustunlariga o'giramiz
    const dbFields: Record<string, any> = {};
    if (parsed.data.title !== undefined) dbFields.title = parsed.data.title;
    if (parsed.data.description !== undefined) dbFields.description = parsed.data.description;
    if (parsed.data.status !== undefined) dbFields.status = parsed.data.status;
    if (parsed.data.priority !== undefined) dbFields.priority = parsed.data.priority;
    if (parsed.data.assigneeId !== undefined) dbFields.assignee_id = parsed.data.assigneeId;
    if (parsed.data.dueDate !== undefined) dbFields.due_date = parsed.data.dueDate;
    

    const task = await updateTask(taskId, dbFields);

    if (!task) {
      return res.status(404).json({ error: "Vazifa topilmadi" });
    }

    res.json({ message: "Vazifa yangilandi", task });
  } catch (error) {
    console.error("Vazifa yangilash xatosi:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const deleteTaskHandler = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.taskId);
    await deleteTask(taskId);
    res.json({ message: "Vazifa o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};