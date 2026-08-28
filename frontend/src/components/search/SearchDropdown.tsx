"use client";

import { useState, useRef, useEffect } from "react";
import { Search, FolderKanban, CheckSquare, User } from "lucide-react";
import { mockProjects, mockKanbanTasks, mockMembers } from "@/lib/mockData";

export default function SearchDropdown() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const q = query.toLowerCase().trim();

  const projects = q ? mockProjects.filter((p) => p.name.toLowerCase().includes(q)) : [];
  const tasks = q ? mockKanbanTasks.filter((t) => t.title.toLowerCase().includes(q)) : [];
  const members = q
    ? mockMembers.filter(
        (m) => m.fullName.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
      )
    : [];

  const hasResults = projects.length > 0 || tasks.length > 0 || members.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
        <input
          type="text"
          placeholder="Qidirish..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-muted-bg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-card transition-colors"
        />
      </div>

      {isOpen && q && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg max-h-80 overflow-y-auto z-20">
          {!hasResults ? (
            <div className="text-center py-8 text-sm text-muted">
              {"\"" + query + "\" bo'yicha hech narsa topilmadi"}
            </div>
          ) : (
            <div className="py-2">
              {projects.length > 0 && (
                <SearchGroup title="Loyihalar" icon={FolderKanban}>
                  {projects.map((p) => (
                    <SearchItem key={p.id} label={p.name} href={`/projects/${p.id}`} />
                  ))}
                </SearchGroup>
              )}
              {tasks.length > 0 && (
                <SearchGroup title="Vazifalar" icon={CheckSquare}>
                  {tasks.map((t) => (
                    <SearchItem key={t.id} label={t.title} href={`/tasks`} />
                  ))}
                </SearchGroup>
              )}
              {members.length > 0 && (
                <SearchGroup title="A'zolar" icon={User}>
                  {members.map((m) => (
                    <SearchItem key={m.id} label={m.fullName} href="/members" />
                  ))}
                </SearchGroup>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SearchGroup({ title, icon: Icon, children }: { title: string; icon: typeof FolderKanban; children: React.ReactNode }) {
  return (
    <div className="px-2 mb-1 last:mb-0">
      <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-muted uppercase tracking-wide">
        <Icon size={12} />
        {title}
      </div>
      {children}
    </div>
  );
}

function SearchItem({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="block px-2 py-2 rounded-lg text-sm text-foreground hover:bg-muted-bg transition-colors truncate">
      {label}
    </a>
  );
}