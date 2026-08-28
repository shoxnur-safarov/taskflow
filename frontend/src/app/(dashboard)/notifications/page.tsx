"use client";

import { useState } from "react";
import { Bell, UserPlus, MessageSquare, Clock, FolderKanban } from "lucide-react";
import { mockNotifications } from "@/lib/mockData";

const typeIcon: Record<string, typeof Bell> = {
  task_assigned: UserPlus,
  comment_added: MessageSquare,
  due_soon: Clock,
  project_updated: FolderKanban,
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const filtered = filter === "unread" ? notifications.filter((n) => !n.isRead) : notifications;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bildirishnomalar</h1>
          <p className="text-sm text-muted mt-1">Loyiha va vazifalaringiz haqida yangiliklar</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm text-primary font-medium hover:underline whitespace-nowrap">
           {" Barchasini o'qilgan deb belgilash"}
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 mb-4 bg-muted-bg rounded-lg p-1 w-fit">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            filter === "all" ? "bg-card shadow-sm text-foreground" : "text-muted"
          }`}
        >
          Barchasi
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            filter === "unread" ? "bg-card shadow-sm text-foreground" : "text-muted"
          }`}
        >
         {" O'qilmagan "} {unreadCount > 0 && `(${unreadCount})`}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <Bell className="mx-auto text-muted mb-3" size={32} />
          <p className="text-foreground font-medium mb-1">{"Bildirishnoma yo'q"}</p>
          <p className="text-sm text-muted">{"Hozircha yangi bildirishnomalar yo'q."}</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {filtered.map((notification) => {
            const Icon = typeIcon[notification.type] || Bell;
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-3 px-4 sm:px-5 py-3.5 border-b border-border last:border-0 ${
                  !notification.isRead ? "bg-primary-light/30" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-primary-light flex-shrink-0 flex items-center justify-center text-primary">
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground">{notification.message}</p>
                  <p className="text-xs text-muted mt-1">{notification.createdAt}</p>
                </div>
                {!notification.isRead && (
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}