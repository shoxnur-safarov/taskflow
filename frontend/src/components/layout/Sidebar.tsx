"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Calendar,
  Bell,
  Settings,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/members", label: "Members", icon: Users },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-border md:bg-card md:h-screen md:sticky md:top-0">
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-lg text-foreground">TaskFlow</span>
        </div>
      </div>

      <div className="px-3 py-3 border-b border-border">
        <button className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-muted-bg transition-colors text-sm">
          <span className="font-medium text-foreground truncate">Acme Corp</span>
          <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-light text-primary"
                  : "text-muted hover:bg-muted-bg hover:text-foreground"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium text-muted hover:bg-muted-bg hover:text-foreground transition-colors"
        >
          <Settings size={18} />
          Settings
        </Link>
        <div className="flex items-center gap-2.5 px-2.5 py-2 mt-1">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium">
            A
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Alisher</p>
            <p className="text-xs text-muted truncate">alisher@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}