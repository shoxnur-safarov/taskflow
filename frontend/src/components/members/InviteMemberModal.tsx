"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface InviteField {
  email: string;
  role: "admin" | "member";
}

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteMemberModal({ isOpen, onClose }: InviteMemberModalProps) {
  const [invites, setInvites] = useState<InviteField[]>([{ email: "", role: "member" }]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const updateInvite = (index: number, field: Partial<InviteField>) => {
    const updated = [...invites];
    updated[index] = { ...updated[index], ...field };
    setInvites(updated);
  };

  const addInviteField = () => {
    setInvites([...invites, { email: "", role: "member" }]);
  };

  const removeInviteField = (index: number) => {
    setInvites(invites.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      setInvites([{ email: "", role: "member" }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{"A'zo taklif qilish"}</h2>
            <p className="text-sm text-muted mt-0.5">{"Workspace'ga yangi a'zo qo'shing"}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted-bg text-muted">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {invites.map((invite, index) => (
            <div key={index} className="flex gap-2 items-start">
              <input
                type="email"
                placeholder="email@example.com"
                value={invite.email}
                onChange={(e) => updateInvite(index, { email: e.target.value })}
                className="flex-1 min-w-0 px-3 py-2.5 rounded-lg border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <select
                value={invite.role}
                onChange={(e) => updateInvite(index, { role: e.target.value as "admin" | "member" })}
                className="w-28 px-2 py-2.5 rounded-lg border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
              {invites.length > 1 && (
                <button
                  onClick={() => removeInviteField(index)}
                  className="p-2.5 text-muted hover:text-danger rounded-lg hover:bg-danger/5 flex-shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addInviteField}
            className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
          >
            <Plus size={14} />
            Yana biriktirish
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Bekor qilish
          </Button>
          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={invites.every((inv) => !inv.email.trim())}
            className="flex-1"
          >
            Taklif yuborish
          </Button>
        </div>
      </div>
    </div>
  );
}