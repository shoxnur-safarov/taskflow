interface BadgeProps {
  children: React.ReactNode;
  color: "todo" | "progress" | "review" | "done" | "low" | "medium" | "high";
}

const colorMap: Record<BadgeProps["color"], string> = {
  todo: "bg-status-todo/10 text-status-todo",
  progress: "bg-status-progress/10 text-status-progress",
  review: "bg-status-review/10 text-status-review",
  done: "bg-status-done/10 text-status-done",
  low: "bg-priority-low/10 text-priority-low",
  medium: "bg-priority-medium/10 text-priority-medium",
  high: "bg-priority-high/10 text-priority-high",
};

export default function Badge({ children, color }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colorMap[color]}`}>
      {children}
    </span>
  );
}