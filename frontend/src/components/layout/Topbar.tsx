"use client";

import { Bell } from "lucide-react";
import SearchDropdown from "@/components/search/SearchDropdown";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 md:px-6 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex-1 max-w-md">
        <SearchDropdown />
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