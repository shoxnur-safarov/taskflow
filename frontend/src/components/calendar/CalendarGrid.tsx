"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Task } from "@/types";

const monthNames = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
];
const dayNames = ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"];

export default function CalendarGrid({ tasks, onTaskClick }: { tasks: Task[]; onTaskClick: (task: Task) => void }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const getTasksForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((t) => t.dueDate === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const cells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="font-semibold text-foreground">
          {monthNames[month]} {year}
        </h3>
        <div className="flex items-center gap-1">
          <button onClick={goToToday} className="px-2.5 py-1 text-xs font-medium rounded-lg border border-border hover:bg-muted-bg transition-colors mr-1">
            Bugun
          </button>
          <button onClick={goToPrevMonth} className="p-1.5 rounded-lg hover:bg-muted-bg text-muted">
            <ChevronLeft size={16} />
          </button>
          <button onClick={goToNextMonth} className="p-1.5 rounded-lg hover:bg-muted-bg text-muted">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 border-b border-border">
        {dayNames.map((name) => (
          <div key={name} className="text-center text-xs font-medium text-muted py-2">
            {name}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          const dayTasks = day ? getTasksForDay(day) : [];
          return (
            <div
              key={i}
              className={`min-h-[70px] sm:min-h-[90px] border-b border-r border-border p-1.5 ${
                !day ? "bg-muted-bg/30" : ""
              }`}
            >
              {day && (
                <>
                  <span
                    className={`text-xs inline-flex items-center justify-center w-5 h-5 rounded-full ${
                      isToday(day) ? "bg-primary text-white font-medium" : "text-muted"
                    }`}
                  >
                    {day}
                  </span>
                  <div className="mt-1 space-y-0.5">
                    {dayTasks.slice(0, 2).map((task) => (
                      <button
                        key={task.id}
                        onClick={() => onTaskClick(task)}
                        className="w-full text-left text-[10px] px-1 py-0.5 rounded bg-primary-light text-primary truncate block"
                      >
                        {task.title}
                      </button>
                    ))}
                    {dayTasks.length > 2 && (
                      <span className="text-[10px] text-muted px-1">+{dayTasks.length - 2} {"ko'proq"}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}