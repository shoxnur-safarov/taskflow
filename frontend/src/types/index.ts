export interface User {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string | null;
}

export interface Workspace {
  id: number;
  name: string;
  description: string | null;
  ownerId: number;
  createdAt: string;
}

export interface WorkspaceMember {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  role: "owner" | "admin" | "member";
  joinedAt: string;
}

export interface Project {
  id: number;
  workspaceId: number;
  name: string;
  description: string | null;
  status: string;
  taskCount: number;
  completedCount: number;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = "todo" | "in_progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  projectId: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: number | null;
  assigneeName?: string | null;
  assigneeAvatar?: string | null;
  dueDate: string | null;
  createdBy: number | null;
  createdAt: string;
  updatedAt: string;
  labels?: Label[];
}

export interface Label {
  id: number;
  workspaceId: number;
  name: string;
  color: string;
}

export interface Comment {
  id: number;
  taskId: number;
  userId: number | null;
  userName?: string;
  userAvatar?: string | null;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: number;
  userId: number;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}