"use client";

import { useState } from "react";
import { Search, Plus, LayoutGrid, List } from "lucide-react";
import ProjectCard from "@/components/dashboard/ProjectCard";
import Button from "@/components/ui/Button";
import { mockProjects } from "@/lib/mockData";

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const filteredProjects = mockProjects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-foreground">Loyihalar</h1>
        <Button className="w-full sm:w-auto">
          <Plus size={16} className="mr-1.5" />
          Yangi loyiha
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Loyiha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="hidden sm:flex items-center gap-1 bg-muted-bg rounded-lg p-1">
          <button
            onClick={() => setView("grid")}
            className={`p-1.5 rounded-md transition-colors ${
              view === "grid" ? "bg-card shadow-sm text-primary" : "text-muted"
            }`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-1.5 rounded-md transition-colors ${
              view === "list" ? "bg-card shadow-sm text-primary" : "text-muted"
            }`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <p className="text-foreground font-medium mb-1">Loyiha topilmadi</p>
          <p className="text-sm text-muted mb-4">{"Qidiruv bo'yicha hech narsa topilmadi."}</p>
        </div>
      ) : (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-3"
          }
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}