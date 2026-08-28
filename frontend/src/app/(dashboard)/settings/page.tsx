"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type SettingsTab = "profile" | "workspace" | "notifications" | "appearance" | "security";

const tabs: { key: SettingsTab; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "workspace", label: "Workspace" },
  { key: "notifications", label: "Notifications" },
  { key: "appearance", label: "Appearance" },
  { key: "security", label: "Security" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">Sozlamalar</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs - chap tomonda desktop, tepada mobil */}
        <div className="flex md:flex-col gap-1 overflow-x-auto md:w-48 flex-shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium text-left whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "bg-primary-light text-primary"
                  : "text-muted hover:bg-muted-bg hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "workspace" && <WorkspaceSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "security" && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h2 className="font-semibold text-foreground mb-4">{"Profil ma'lumotlari"}</h2>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-semibold">
          A
        </div>
        <div>
          <Button variant="outline" className="text-sm">
            {"Rasmni o'zgartirish"}
          </Button>
        </div>
      </div>
      <div className="space-y-4 max-w-sm">
        <Input label="To'liq ism" defaultValue="Alisher Navoiy" />
        <Input label="Email" type="email" defaultValue="alisher@example.com" />
      </div>
      <Button className="mt-5">Saqlash</Button>
    </div>
  );
}

function WorkspaceSettings() {
  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="font-semibold text-foreground mb-4">{"Workspace ma'lumotlari"}</h2>
        <div className="space-y-4 max-w-sm">
          <Input label="Workspace nomi" defaultValue="Acme Corp" />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Tavsif</label>
            <textarea
              className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm bg-card outline-none focus:ring-2 focus:ring-primary/20"
              rows={2}
              defaultValue="Bizning asosiy jamoa workspace'i"
            />
          </div>
        </div>
        <Button className="mt-5">Saqlash</Button>
      </div>

      <div className="bg-card border border-danger/30 rounded-xl p-5">
        <h2 className="font-semibold text-danger mb-1">Xavfli hudud</h2>
        <p className="text-sm text-muted mb-4">
          {"Workspace'ni o'chirish qaytarib bo'lmaydigan amal. Barcha ma'lumotlar yo'qoladi."}
        </p>
        <Button variant="outline" className="border-danger text-danger hover:bg-danger/5">
          {"Workspace'ni o'chirish"}
        </Button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: true,
    taskAssigned: true,
    mentions: true,
  });

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h2 className="font-semibold text-foreground mb-4">Bildirishnoma sozlamalari</h2>
      <div className="space-y-4">
        <ToggleRow
          label="Email bildirishnomalari"
          checked={settings.email}
          onChange={(v) => setSettings({ ...settings, email: v })}
        />
        <ToggleRow
          label="Vazifa biriktirilganda"
          checked={settings.taskAssigned}
          onChange={(v) => setSettings({ ...settings, taskAssigned: v })}
        />
        <ToggleRow
          label="Eslatib o'tilganda (mentions)"
          checked={settings.mentions}
          onChange={(v) => setSettings({ ...settings, mentions: v })}
        />
      </div>
    </div>
  );
}

function AppearanceSettings() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h2 className="font-semibold text-foreground mb-4">{"Ko'rinish"}</h2>
      <div className="grid grid-cols-3 gap-3 max-w-md">
        {(["light", "dark", "system"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`p-3 rounded-lg border-2 text-sm font-medium capitalize transition-colors ${
              theme === t ? "border-primary bg-primary-light text-primary" : "border-border text-muted"
            }`}
          >
            {t === "light" && "Yorug'"}
            {t === "dark" && "Qorong'u"}
            {t === "system" && "Tizim"}
          </button>
        ))}
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h2 className="font-semibold text-foreground mb-4">{"Parolni o'zgartirish"}</h2>
      <div className="space-y-4 max-w-sm">
        <Input label="Joriy parol" type="password" />
        <Input label="Yangi parol" type="password" />
        <Input label="Yangi parolni tasdiqlang" type="password" />
      </div>
      <Button className="mt-5">Parolni yangilash</Button>
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-10 h-5.5 rounded-full transition-colors relative ${checked ? "bg-primary" : "bg-border"}`}
      >
        <span
          className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-[19px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}