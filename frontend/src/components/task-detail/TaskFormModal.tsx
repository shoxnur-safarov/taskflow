"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { TaskPriority, TaskStatus } from "@/types";
import { mockMembers, mockLabels } from "@/lib/mockData";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStatus?: TaskStatus;
}

export default function TaskFormModal({ isOpen, onClose, defaultStatus = "todo" }: TaskFormModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [assigneeId, setAssigneeId] = useState<number | "">("");
  const [dueDate, setDueDate] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const toggleLabel = (id: number) => {
    setSelectedLabels((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      setTitle("");
      setDescription("");
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Yangi vazifa</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted-bg text-muted">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <Input
            label="Sarlavha"
            placeholder="Vazifa nomini kiriting"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Tavsif</label>
            <textarea
              className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm bg-card outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows={3}
              placeholder="Vazifa haqida batafsil"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Muddat</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Assignee</label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value ? Number(e.target.value) : "")}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Biriktirilmagan</option>
              {mockMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.fullName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Labels</label>
            <div className="flex flex-wrap gap-2">
              {mockLabels.map((label) => (
                <button
                  key={label.id}
                  onClick={() => toggleLabel(label.id)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium border transition-all"
                  style={{
                    backgroundColor: selectedLabels.includes(label.id) ? `${label.color}20` : "transparent",
                    borderColor: selectedLabels.includes(label.id) ? label.color : "var(--border)",
                    color: selectedLabels.includes(label.id) ? label.color : "var(--muted)",
                  }}
                >
                  {label.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Bekor qilish
          </Button>
          <Button onClick={handleSubmit} isLoading={isLoading} disabled={!title.trim()} className="flex-1">
            Vazifa yaratish
          </Button>
        </div>
      </div>
    </div>
  );
}