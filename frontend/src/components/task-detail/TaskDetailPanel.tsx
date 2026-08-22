"use client";

import { useState } from "react";
import { X, Paperclip, Send } from "lucide-react";
import { Task } from "@/types";
import Badge from "@/components/ui/Badge";

interface TaskDetailPanelProps {
  task: Task | null;
  onClose: () => void;
}

const mockComments = [
  {
    id: 1,
    userName: "Sardor",
    content: "Men bu bugni Safari'da tekshirdim, tasdiqlandi.",
    createdAt: "2 soat oldin",
  },
  {
    id: 2,
    userName: "Alisher",
    content: "Rahmat, tuzatishni boshladim.",
    createdAt: "1 soat oldin",
  },
];

const mockActivity = [
  { id: 1, text: "Alisher vazifani yaratdi", time: "3 kun oldin" },
  { id: 2, text: "Status \"To Do\" dan \"In Progress\"ga o'zgartirildi", time: "1 kun oldin" },
];

export default function TaskDetailPanel({ task, onClose }: TaskDetailPanelProps) {
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState<"comments" | "attachments" | "activity">("comments");

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fon overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full sm:w-[480px] h-full bg-card flex flex-col shadow-2xl animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-sm text-muted">Vazifa #{task.id}</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted-bg text-muted">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* Title */}
          <h2 className="text-lg font-semibold text-foreground mb-4">{task.title}</h2>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-border">
            <div>
              <p className="text-xs text-muted mb-1">Status</p>
              <Badge color={task.status === "in_progress" ? "progress" : task.status === "done" ? "done" : task.status === "review" ? "review" : "todo"}>
                {task.status}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">Priority</p>
              <Badge color={task.priority as "low" | "medium" | "high"}>{task.priority}</Badge>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">Assignee</p>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-medium">
                  {task.assigneeName?.charAt(0) || "?"}
                </div>
                <span className="text-sm text-foreground">{task.assigneeName || "Biriktirilmagan"}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">Due date</p>
              <p className="text-sm text-foreground">{task.dueDate || "Belgilanmagan"}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <p className="text-xs font-medium text-muted mb-2">Tavsif</p>
            <p className="text-sm text-foreground">
              {task.description || "Tavsif kiritilmagan."}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4 border-b border-border mb-4">
            {(["comments", "attachments", "activity"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {tab === "comments" && `Comments (${mockComments.length})`}
                {tab === "attachments" && "Attachments"}
                {tab === "activity" && "Activity"}
              </button>
            ))}
          </div>

          {/* Comments */}
          {activeTab === "comments" && (
            <div className="space-y-4">
              {mockComments.map((c) => (
                <div key={c.id} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs font-medium">
                    {c.userName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-foreground">{c.userName}</span>
                      <span className="text-xs text-muted">{c.createdAt}</span>
                    </div>
                    <p className="text-sm text-foreground mt-0.5">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Attachments */}
          {activeTab === "attachments" && (
            <div className="text-center py-8">
              <Paperclip className="mx-auto text-muted mb-2" size={24} />
              <p className="text-sm text-muted">Hali fayl biriktirilmagan</p>
            </div>
          )}

          {/* Activity */}
          {activeTab === "activity" && (
            <div className="space-y-3">
              {mockActivity.map((a) => (
                <div key={a.id} className="text-sm">
                  <p className="text-foreground">{a.text}</p>
                  <p className="text-xs text-muted">{a.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comment input - faqat comments tab'da */}
        {activeTab === "comments" && (
          <div className="px-5 py-3 border-t border-border flex items-center gap-2">
            <input
              type="text"
              placeholder="Izoh yozing..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-muted-bg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button className="p-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors">
              <Send size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}