"use client";

import { useState } from "react";
import { Plus, Users, Settings } from "lucide-react";
import KanbanColumn from "@/components/kanban/KanbanColumn";
import { mockKanbanTasks, mockProjects } from "@/lib/mockData";
import { Task, TaskStatus } from "@/types";

const statuses: TaskStatus[] = ["todo", "in_progress", "review", "done"];

export default function ProjectDetailPage() {
  const [tasks] = useState<Task[]>(mockKanbanTasks);
  const [activeTab, setActiveTab] = useState<"board" | "list" | "calendar" | "activity">("board");
  const project = mockProjects[0];

  const handleTaskClick = (task: Task) => {
    console.log("Task ochildi:", task.title);
    // Task Detail panel keyingi qadamda qo'shiladi
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
            <p className="text-sm text-muted mt-1">{project.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-border hover:bg-muted-bg transition-colors">
              <Users size={16} className="text-muted" />
            </button>
            <button className="p-2 rounded-lg border border-border hover:bg-muted-bg transition-colors">
              <Settings size={16} className="text-muted" />
            </button>
            <button className="flex items-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
              <Plus size={16} />
              <span className="hidden sm:inline">{"Vazifa qo'shish"}</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-border overflow-x-auto">
          {(["board", "list", "calendar", "activity"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab === "board" && "Board"}
              {tab === "list" && "List"}
              {tab === "calendar" && "Calendar"}
              {tab === "activity" && "Activity"}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      {activeTab === "board" && (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {statuses.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={tasks.filter((t) => t.status === status)}
              onTaskClick={handleTaskClick}
              onAddTask={() => console.log("Add task to", status)}
            />
          ))}
        </div>
      )}

      {activeTab !== "board" && (
        <div className="text-center py-16 text-muted">
          {activeTab === "list" && "List View — keyingi qadamda qo'shiladi"}
          {activeTab === "calendar" && "Calendar View — keyingi qadamda qo'shiladi"}
          {activeTab === "activity" && "Activity Feed — keyingi qadamda qo'shiladi"}
        </div>
      )}
    </div>
  );
}