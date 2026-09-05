"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronsUpDown, Check, Plus } from "lucide-react";

const mockWorkspaces = [
  { id: 1, name: "Acme Corp" },
  { id: 2, name: "Side Project" },
];

export default function WorkspaceSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(mockWorkspaces[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-muted-bg transition-colors text-sm"
      >
        <span className="font-medium text-foreground truncate">{active.name}</span>
        <ChevronsUpDown size={14} className="text-muted flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg py-1 z-30">
          {mockWorkspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => {
                setActive(ws);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-muted-bg transition-colors"
            >
              {ws.name}
              {active.id === ws.id && <Check size={14} className="text-primary" />}
            </button>
          ))}
          <div className="border-t border-border mt-1 pt-1">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-muted-bg transition-colors">
              <Plus size={14} />
              Yangi workspace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}