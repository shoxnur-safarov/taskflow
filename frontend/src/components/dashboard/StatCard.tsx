import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  accent?: "default" | "danger";
}

export default function StatCard({ label, value, icon: Icon, accent = "default" }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          accent === "danger" ? "bg-danger/10 text-danger" : "bg-primary-light text-primary"
        }`}
      >
        <Icon size={20} />
      </div>
      <div>
        <p className={`text-xl font-bold ${accent === "danger" ? "text-danger" : "text-foreground"}`}>
          {value}
        </p>
        <p className="text-xs text-muted">{label}</p>
      </div>
    </div>
  );
}