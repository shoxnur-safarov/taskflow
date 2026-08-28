"use client";

import CalendarGrid from "@/components/calendar/CalendarGrid";
import TaskDetailPanel from "@/components/task-detail/TaskDetailPanel";
import { mockKanbanTasks } from "@/lib/mockData";
import { Task } from "@/types";
import { useState } from "react";

export default function CalendarPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">Kalendar</h1>
      <CalendarGrid tasks={mockKanbanTasks} onTaskClick={setSelectedTask} />
      <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}