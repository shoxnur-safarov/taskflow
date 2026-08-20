import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1, "Izoh bo'sh bo'lmasligi kerak").max(2000),
});