"use client";

import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 md:px-6 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Qidirish..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-muted-bg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-card transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-muted-bg transition-colors">
          <Bell size={20} className="text-muted" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium md:hidden">
          A
        </div>
      </div>
    </header>
  );
}