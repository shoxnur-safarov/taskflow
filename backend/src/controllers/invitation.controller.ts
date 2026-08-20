import type { Response } from "express";
import { inviteMemberSchema } from "../validators/invitation.validator.js";
import {
  createInvitation,
  getInvitationsByWorkspace,
  getWorkspaceMembers,
} from "../models/invitation.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const inviteMember = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = inviteMemberSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message });
    }

    const { email, role } = parsed.data;
    const workspaceId = Number(req.params.workspaceId);
    const userId = req.userId!;

    const invitation = await createInvitation(workspaceId, email, role, userId);

    res.status(201).json({ message: "Taklif yuborildi", invitation });
  } catch (error) {
    console.error("Taklif yuborish xatosi:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const getInvitations = async (req: AuthRequest, res: Response) => {
  try {
    const workspaceId = Number(req.params.workspaceId);
    const invitations = await getInvitationsByWorkspace(workspaceId);
    res.json({ invitations });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

export const getMembers = async (req: AuthRequest, res: Response) => {
  try {
    const workspaceId = Number(req.params.workspaceId);
    const members = await getWorkspaceMembers(workspaceId);
    res.json({ members });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};