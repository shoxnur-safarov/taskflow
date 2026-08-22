import { Project } from "@/types";
import { MoreVertical } from "lucide-react";

const months = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

export default function ProjectCard({ project }: { project: Project }) {
  const progress = Math.round((project.completedCount / project.taskCount) * 100) || 0;

  return (
    <a
      href={`/projects/${project.id}`}
      className="block bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center text-primary font-semibold text-sm">
          {project.name.charAt(0)}
        </div>
        <button className="text-muted hover:text-foreground p-1 -mr-1" onClick={(e) => e.preventDefault()}>
          <MoreVertical size={16} />
        </button>
      </div>

      <h3 className="font-semibold text-foreground mb-1 truncate">{project.name}</h3>
      <p className="text-sm text-muted mb-4 line-clamp-2 min-h-[2.5rem]">
        {project.description || "Tavsif kiritilmagan"}
      </p>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs text-muted whitespace-nowrap">{progress}%</span>
      </div>

      <div className="flex items-center justify-between text-xs text-muted">
        <span>{project.taskCount} vazifa</span>
        <span>{formatDate(project.updatedAt)}</span>
      </div>
    </a>
  );
}