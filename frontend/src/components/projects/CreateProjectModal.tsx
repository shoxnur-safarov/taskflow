"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      setName("");
      setDescription("");
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Yangi loyiha</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted-bg text-muted">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <Input
            label="Loyiha nomi"
            placeholder="Masalan: Website Redesign"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Tavsif (ixtiyoriy)
            </label>
            <textarea
              className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm bg-card outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows={3}
              placeholder="Qisqacha tavsif"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Bekor qilish
          </Button>
          <Button onClick={handleSubmit} isLoading={isLoading} disabled={!name.trim()} className="flex-1">
            Loyiha yaratish
          </Button>
        </div>
      </div>
    </div>
  );
}