"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { mockLabels } from "@/lib/mockData";

const colorOptions = ["#3b82f6", "#ef4444", "#a855f7", "#10b981", "#f59e0b", "#ec4899"];

export default function LabelsPage() {
  const [labelName, setLabelName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-1">Label boshqaruvi</h1>
      <p className="text-sm text-muted mb-6">Workspace bo'ylab ishlatiladigan label'larni yarating va boshqaring.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Create new label */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-5 h-fit">
          <h2 className="font-semibold text-foreground mb-4">Yangi label</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Label nomi</label>
              <input
                type="text"
                placeholder="Masalan: Frontend"
                value={labelName}
                onChange={(e) => setLabelName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Rang</label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full transition-transform ${
                      selectedColor === color ? "scale-110 ring-2 ring-offset-2 ring-border" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <Button disabled={!labelName.trim()} className="w-full">
              Label yaratish
            </Button>
          </div>
        </div>

        {/* Active labels */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-5 h-fit">
          <h2 className="font-semibold text-foreground mb-4">Faol label'lar</h2>
          <div className="space-y-2">
            {mockLabels.map((label) => (
              <div
                key={label.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted-bg transition-colors"
              >
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: `${label.color}20`, color: label.color }}
                >
                  {label.name}
                </span>
                <button className="text-muted hover:text-danger p-1">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}