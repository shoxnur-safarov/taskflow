import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(2, "Sarlavha kamida 2 ta belgidan iborat bo'lishi kerak").max(255),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional().default("medium"),
  assigneeId: z.number().nullable().optional(),
  dueDate: z.string().nullable().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(2).max(255).optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "review", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  assigneeId: z.number().nullable().optional(),
  dueDate: z.string().nullable().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;