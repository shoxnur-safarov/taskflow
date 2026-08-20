import { z } from "zod";

export const inviteMemberSchema = z.object({
  email: z.string().email("Email noto'g'ri formatda"),
  role: z.enum(["admin", "member"], {
    message: "Role admin yoki member bo'lishi kerak",
  }),
});

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;