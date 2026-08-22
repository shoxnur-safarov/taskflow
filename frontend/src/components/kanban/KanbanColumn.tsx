import { Task, TaskStatus } from "@/types";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

const statusConfig: Record<TaskStatus, { label: string; dot: string }> = {
  todo: { label: "To Do", dot: "bg-status-todo" },
  in_progress: { label: "In Progress", dot: "bg-status-progress" },
  review: { label: "Review", dot: "bg-status-review" },
  done: { label: "Done", dot: "bg-status-done" },
};

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onAddTask: () => void;
  hideHeader?: boolean;
}

export default function KanbanColumn({ status, tasks, onTaskClick, onAddTask, hideHeader = false }: KanbanColumnProps) {
  const config = statusConfig[status];

  return (
   <div className={`flex-shrink-0 ${hideHeader ? "w-full" : "w-[85vw] sm:w-72"} flex flex-col bg-muted-bg rounded-xl`}>
      {!hideHeader && (
        <div className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${config.dot}`} />
            <span className="text-sm font-medium text-foreground">{config.label}</span>
            <span className="text-xs text-muted bg-border rounded-full px-1.5 py-0.5">
              {tasks.length}
            </span>
          </div>
          <button onClick={onAddTask} className="text-muted hover:text-foreground p-1">
            <Plus size={16} />
          </button>
        </div>
      )}

      <div className="px-3 py-3 space-y-2 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-xs text-muted">{"Vazifalar yo'q"}</div>
        )}
      </div>
    </div>
  );
}