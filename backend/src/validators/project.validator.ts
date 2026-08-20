import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(2, "Loyiha nomi kamida 2 ta belgidan iborat bo'lishi kerak").max(100),
  description: z.string().max(500).optional(),
  memberIds: z.array(z.number()).optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;