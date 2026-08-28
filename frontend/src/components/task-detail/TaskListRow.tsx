import { Task } from "@/types";
import Badge from "@/components/ui/Badge";

const priorityColor: Record<string, "low" | "medium" | "high"> = {
  low: "low",
  medium: "medium",
  high: "high",
};

const statusColor: Record<string, "todo" | "progress" | "review" | "done"> = {
  todo: "todo",
  in_progress: "progress",
  review: "review",
  done: "done",
};

const statusLabel: Record<string, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

export default function TaskListRow({ task, onClick }: { task: Task; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-3 items-center px-4 py-3 hover:bg-muted-bg transition-colors border-b border-border last:border-0"
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
        <div className="flex items-center gap-2 mt-1 sm:hidden">
          <Badge color={statusColor[task.status]}>{statusLabel[task.status]}</Badge>
          <Badge color={priorityColor[task.priority]}>{task.priority}</Badge>
        </div>
      </div>

      <div className="hidden sm:block">
        <Badge color={statusColor[task.status]}>{statusLabel[task.status]}</Badge>
      </div>
      <div className="hidden sm:block">
        <Badge color={priorityColor[task.priority]}>{task.priority}</Badge>
      </div>
      <div className="hidden sm:flex items-center gap-1.5">
        {task.assigneeName ? (
          <>
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-medium">
              {task.assigneeName.charAt(0)}
            </div>
            <span className="text-sm text-muted truncate">{task.assigneeName}</span>
          </>
        ) : (
          <span className="text-sm text-muted">—</span>
        )}
      </div>
      <div className="hidden sm:block text-sm text-muted">
        {task.dueDate || "—"}
      </div>
    </button>
  );
}