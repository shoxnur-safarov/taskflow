import { Task } from "@/types";
import Badge from "@/components/ui/Badge";

const priorityColor: Record<string, "low" | "medium" | "high"> = {
  low: "low",
  medium: "medium",
  high: "high",
};

export default function TaskRow({ task }: { task: Task }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-border last:border-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
        <p className="text-xs text-muted mt-0.5">
          {task.dueDate && new Date(task.dueDate).toLocaleDateString("uz-UZ", { day: "numeric", month: "short" })}
        </p>
      </div>
      <Badge color={priorityColor[task.priority]}>{task.priority}</Badge>
    </div>
  );
}