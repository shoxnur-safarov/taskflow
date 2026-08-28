"use client";

import { useState } from "react";
import { Plus, Users, Settings } from "lucide-react";
import KanbanColumn from "@/components/kanban/KanbanColumn";
import { mockKanbanTasks, mockProjects } from "@/lib/mockData";
import { Task, TaskStatus } from "@/types";
import TaskDetailPanel from "@/components/task-detail/TaskDetailPanel";
import TaskListRow from "@/components/task-detail/TaskListRow";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import ActivityFeed from "@/components/activity/ActivityFeed";


const statuses: TaskStatus[] = ["todo", "in_progress", "review", "done"];

export default function ProjectDetailPage() {
  const [tasks] = useState<Task[]>(mockKanbanTasks);
  const [activeTab, setActiveTab] = useState<"board" | "list" | "calendar" | "activity">("board");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [mobileStatus, setMobileStatus] = useState<TaskStatus>("todo");
  const project = mockProjects[0];

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
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
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
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
        <>
          {/* Mobil - status tab'lari */}
          <div className="sm:hidden flex items-center gap-1 mb-4 bg-muted-bg rounded-lg p-1 overflow-x-auto">
            {statuses.map((status) => {
              const config = {
                todo: { label: "To Do", dot: "bg-status-todo" },
                in_progress: { label: "In Progress", dot: "bg-status-progress" },
                review: { label: "Review", dot: "bg-status-review" },
                done: { label: "Done", dot: "bg-status-done" },
              }[status];
              const count = tasks.filter((t) => t.status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setMobileStatus(status)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${mobileStatus === status ? "bg-card shadow-sm text-foreground" : "text-muted"
                    }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                  {config.label}
                  <span className="text-[10px] text-muted">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Mobil - bitta ustun */}
          <div className="sm:hidden">
            <KanbanColumn
              status={mobileStatus}
              tasks={tasks.filter((t) => t.status === mobileStatus)}
              onTaskClick={handleTaskClick}
              onAddTask={() => console.log("Add task to", mobileStatus)}
              hideHeader
            />
          </div>

          {/* Desktop/Tablet - hammasi yonma-yon */}
          <div className="hidden sm:flex gap-4 overflow-x-auto pb-4">
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
        </>
      )}

      {/* List View */}
      {activeTab === "list" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-3 px-4 py-2.5 bg-muted-bg text-xs font-medium text-muted uppercase tracking-wide">
            <span>Task</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Assignee</span>
            <span>Due Date</span>
          </div>
          {tasks.map((task) => (
            <TaskListRow key={task.id} task={task} onClick={() => handleTaskClick(task)} />
          ))}
        </div>
      )}

      {/* Calendar View - placeholder */}
      {activeTab === "calendar" && (
        <CalendarGrid tasks={tasks} onTaskClick={handleTaskClick} />
      )}

      {/* Activity View - placeholder */}
      {activeTab === "activity" && <ActivityFeed />}

      <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}