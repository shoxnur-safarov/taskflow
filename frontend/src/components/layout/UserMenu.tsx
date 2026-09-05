"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
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
        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted-bg transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
          A
        </div>
        <div className="min-w-0 text-left">
          <p className="text-sm font-medium text-foreground truncate">Alisher</p>
          <p className="text-xs text-muted truncate">alisher@example.com</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-1 bg-card border border-border rounded-lg shadow-lg py-1 z-30">
          <Link href="/settings" className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted-bg transition-colors">
            <User size={15} />
            Profil
          </Link>
          <Link href="/settings" className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted-bg transition-colors">
            <Settings size={15} />
            Sozlamalar
          </Link>
          <div className="border-t border-border mt-1 pt-1">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-danger hover:bg-danger/5 transition-colors">
              <LogOut size={15} />
              Chiqish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}