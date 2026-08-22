import { FolderKanban, CheckSquare, CheckCircle2, AlertCircle } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import TaskRow from "@/components/dashboard/TaskRow";
import { mockTasks, mockProjects, mockStats } from "@/lib/mockData";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Xush kelibsiz, Alisher</h1>
          <p className="text-sm text-muted mt-1">{"Bugun sizni nima kutmoqda, ko'ramiz."}</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Loyihalar" value={mockStats.totalProjects} icon={FolderKanban} />
        <StatCard label="Vazifalar" value={mockStats.totalTasks} icon={CheckSquare} />
        <StatCard label="Bajarilgan" value={mockStats.completedTasks} icon={CheckCircle2} />
        <StatCard label="Muddati o'tgan" value={mockStats.overdueTasks} icon={AlertCircle} accent="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* My Tasks */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-foreground">Mening vazifalarim</h2>
            <a href="/tasks" className="text-sm text-primary hover:underline">
              Barchasi
            </a>
          </div>
          <div>
            {mockTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-foreground">{"So'nggi loyihalar"}</h2>
            <a href="/projects" className="text-sm text-primary hover:underline">
              Barchasi
            </a>
          </div>
          <div className="space-y-3">
            {mockProjects.map((project) => (
              <a
                key={project.id}
                href={`/projects/${project.id}`}
                className="block p-3 rounded-lg hover:bg-muted-bg transition-colors"
              >
                <p className="text-sm font-medium text-foreground">{project.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${Math.round((project.completedCount / project.taskCount) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted whitespace-nowrap">
                    {project.completedCount}/{project.taskCount}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}