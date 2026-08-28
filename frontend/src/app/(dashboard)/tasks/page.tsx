"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import TaskListRow from "@/components/task-detail/TaskListRow";
import TaskDetailPanel from "@/components/task-detail/TaskDetailPanel";
import { mockKanbanTasks } from "@/lib/mockData";
import { Task } from "@/types";

type FilterType = "all" | "my" | "overdue" | "completed";

export default function TasksPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = mockKanbanTasks.filter((task) => {
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "completed") return task.status === "done";
    if (filter === "my") return task.assigneeName === "Alisher";
    if (filter === "overdue") return task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";
    return true;
  });

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "Barchasi" },
    { key: "my", label: "Mening vazifalarim" },
    { key: "overdue", label: "Muddati o'tgan" },
    { key: "completed", label: "Bajarilgan" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">Vazifalar</h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Vazifa qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-1 bg-muted-bg rounded-lg p-1 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.key ? "bg-card shadow-sm text-foreground" : "text-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <p className="text-foreground font-medium mb-1">Vazifa topilmadi</p>
          <p className="text-sm text-muted">{"Filtr yoki qidiruv bo'yicha hech narsa topilmadi."}</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-3 px-4 py-2.5 bg-muted-bg text-xs font-medium text-muted uppercase tracking-wide">
            <span>Task</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Assignee</span>
            <span>Due Date</span>
          </div>
          {filteredTasks.map((task) => (
            <TaskListRow key={task.id} task={task} onClick={() => setSelectedTask(task)} />
          ))}
        </div>
      )}

      <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}