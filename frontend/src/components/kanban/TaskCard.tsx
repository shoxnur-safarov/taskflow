import { Task } from "@/types";
import Badge from "@/components/ui/Badge";
import { MessageSquare } from "lucide-react";

const priorityColor: Record<string, "low" | "medium" | "high"> = {
  low: "low",
  medium: "medium",
  high: "high",
};

const months = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

export default function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-card border border-border rounded-lg p-3 hover:shadow-md hover:border-primary/30 transition-all"
    >
      <p className="text-sm font-medium text-foreground mb-2 line-clamp-2">{task.title}</p>

      {task.labels && task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {task.labels.map((label) => (
            <span
              key={label.id}
              className="text-[10px] px-1.5 py-0.5 rounded font-medium"
              style={{ backgroundColor: `${label.color}20`, color: label.color }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <Badge color={priorityColor[task.priority]}>{task.priority}</Badge>
          {task.dueDate && (
            <span className="text-xs text-muted">{formatDate(task.dueDate)}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare size={13} className="text-muted" />
          {task.assigneeName && (
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-medium">
              {task.assigneeName.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}