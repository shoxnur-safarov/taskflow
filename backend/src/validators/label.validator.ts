import { z } from "zod";

export const createLabelSchema = z.object({
  name: z.string().min(1, "Label nomi kiritilishi shart").max(50),
  color: z.string().min(1, "Rang tanlanishi shart"),
});