import { Task, Project } from "@/types";
import { Label } from "@/types";
import { WorkspaceMember } from "@/types";

export const mockTasks: Task[] = [
  {
    id: 1,
    projectId: 1,
    title: "Design system tokens",
    description: null,
    status: "in_progress",
    priority: "high",
    assigneeId: 1,
    assigneeName: "Alisher",
    assigneeAvatar: null,
    dueDate: "2026-08-24",
    createdBy: 1,
    createdAt: "2026-08-20",
    updatedAt: "2026-08-20",
  },
  {
    id: 2,
    projectId: 1,
    title: "Fix authentication bug on Safari",
    description: null,
    status: "todo",
    priority: "high",
    assigneeId: 1,
    assigneeName: "Alisher",
    assigneeAvatar: null,
    dueDate: "2026-08-26",
    createdBy: 1,
    createdAt: "2026-08-20",
    updatedAt: "2026-08-20",
  },
  {
    id: 3,
    projectId: 2,
    title: "API documentation for v2",
    description: null,
    status: "review",
    priority: "medium",
    assigneeId: 1,
    assigneeName: "Alisher",
    assigneeAvatar: null,
    dueDate: "2026-08-28",
    createdBy: 1,
    createdAt: "2026-08-20",
    updatedAt: "2026-08-20",
  },
];

export const mockProjects: Project[] = [
  {
    id: 1,
    workspaceId: 1,
    name: "Website Redesign",
    description: "Yangi marketing sayti",
    status: "active",
    taskCount: 12,
    completedCount: 5,
    createdAt: "2026-08-15",
    updatedAt: "2026-08-20",
  },
  {
    id: 2,
    workspaceId: 1,
    name: "Mobile App v2",
    description: "iOS va Android yangilanishi",
    status: "active",
    taskCount: 22,
    completedCount: 18,
    createdAt: "2026-08-10",
    updatedAt: "2026-08-19",
  },
];

export const mockStats = {
  totalProjects: 4,
  totalTasks: 34,
  completedTasks: 18,
  overdueTasks: 3,
};

export const mockLabels: Label[] = [
  { id: 1, workspaceId: 1, name: "Frontend", color: "#3b82f6" },
  { id: 2, workspaceId: 1, name: "Bug", color: "#ef4444" },
  { id: 3, workspaceId: 1, name: "Design", color: "#a855f7" },
];

export const mockKanbanTasks: Task[] = [
  { ...mockTasks[0], status: "todo", labels: [mockLabels[2]] },
  { ...mockTasks[1], status: "todo", labels: [mockLabels[1]] },
  { ...mockTasks[2], status: "in_progress", labels: [mockLabels[0]] },
  {
    id: 4,
    projectId: 1,
    title: "Update homepage hero section",
    description: null,
    status: "in_progress",
    priority: "medium",
    assigneeId: 1,
    assigneeName: "Alisher",
    assigneeAvatar: null,
    dueDate: "2026-08-25",
    createdBy: 1,
    createdAt: "2026-08-20",
    updatedAt: "2026-08-20",
    labels: [mockLabels[0], mockLabels[2]],
  },
  {
    id: 5,
    projectId: 1,
    title: "Review pull request #42",
    description: null,
    status: "review",
    priority: "low",
    assigneeId: 1,
    assigneeName: "Alisher",
    assigneeAvatar: null,
    dueDate: null,
    createdBy: 1,
    createdAt: "2026-08-19",
    updatedAt: "2026-08-20",
    labels: [],
  },
  {
    id: 6,
    projectId: 1,
    title: "Set up CI/CD pipeline",
    description: null,
    status: "done",
    priority: "medium",
    assigneeId: 1,
    assigneeName: "Alisher",
    assigneeAvatar: null,
    dueDate: null,
    createdBy: 1,
    createdAt: "2026-08-15",
    updatedAt: "2026-08-18",
    labels: [mockLabels[0]],
  },
];

export const mockMembers: WorkspaceMember[] = [
  {
    id: 1,
    fullName: "Alisher Navoiy",
    email: "alisher@example.com",
    avatarUrl: null,
    role: "owner",
    joinedAt: "2026-08-15",
  },
  {
    id: 2,
    fullName: "Sardor Yusupov",
    email: "sardor@example.com",
    avatarUrl: null,
    role: "admin",
    joinedAt: "2026-08-16",
  },
  {
    id: 3,
    fullName: "Malika Karimova",
    email: "malika@example.com",
    avatarUrl: null,
    role: "member",
    joinedAt: "2026-08-18",
  },
];

export const mockPendingInvites = [
  { id: 1, email: "jamshid@example.com", role: "member", status: "pending" },
  { id: 2, email: "nodira@example.com", role: "admin", status: "pending" },
];