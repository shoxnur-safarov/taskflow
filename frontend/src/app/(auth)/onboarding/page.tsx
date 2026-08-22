"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import OnboardingProgress from "@/components/auth/OnboardingProgress";

type InviteField = { email: string; role: "admin" | "member" };

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [invites, setInvites] = useState<InviteField[]>([{ email: "", role: "member" }]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const addInviteField = () => {
    setInvites([...invites, { email: "", role: "member" }]);
  };

  const updateInvite = (index: number, field: Partial<InviteField>) => {
    const updated = [...invites];
    updated[index] = { ...updated[index], ...field };
    setInvites(updated);
  };

  const handleFinish = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted-bg px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">TaskFlow</h1>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8">
          <OnboardingProgress currentStep={step} totalSteps={totalSteps} />

          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center py-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {"TaskFlow'ga xush kelibsiz!"}
              </h2>
              <p className="text-muted mb-8">
                {"Keling, ish maydoningizni bir necha qadamda sozlaymiz."}
              </p>
              <Button onClick={() => setStep(2)} className="w-full sm:w-auto">
                Boshlash
              </Button>
            </div>
          )}

          {/* Step 2: Create Workspace */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Workspace yarating</h2>
              <p className="text-sm text-muted mb-6">
                {"Workspace — jamoangiz va loyihalaringiz shu yerda yig'iladi."}
              </p>
              <div className="space-y-4">
                <Input
                  label="Workspace nomi"
                  placeholder="Masalan: Acme Corp"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Tavsif (ixtiyoriy)
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm bg-card outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={2}
                    placeholder="Qisqacha tavsif"
                    value={workspaceDescription}
                    onChange={(e) => setWorkspaceDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Orqaga
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!workspaceName.trim()}
                  className="flex-1"
                >
                  Davom etish
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Invite Members */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">
                {"Jamoa a'zolarini taklif qiling"}
              </h2>
              <p className="text-sm text-muted mb-6">
                {"Buni keyinroq ham qilishingiz mumkin."}
              </p>
              <div className="space-y-3">
                {invites.map((invite, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="email"
                      placeholder="colleague@example.com"
                      className="flex-1 rounded-lg border border-border px-3.5 py-2.5 text-sm bg-card outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={invite.email}
                      onChange={(e) => updateInvite(index, { email: e.target.value })}
                    />
                    <select
                      className="rounded-lg border border-border px-3 py-2.5 text-sm bg-card outline-none focus:ring-2 focus:ring-primary/20"
                      value={invite.role}
                      onChange={(e) =>
                        updateInvite(index, { role: e.target.value as "admin" | "member" })
                      }
                    >
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                ))}
              </div>
              <button
                onClick={addInviteField}
                className="mt-3 text-sm text-primary font-medium hover:underline"
              >
                + Yana biriktirish
              </button>
              <div className="flex gap-3 mt-8">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Orqaga
                </Button>
                <Button variant="secondary" onClick={() => setStep(4)} className="flex-1">
                  {"O'tkazib yuborish"}
                </Button>
                <Button onClick={() => setStep(4)} className="flex-1">
                  Davom etish
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Create Project */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">
                Birinchi loyihangizni yarating
              </h2>
              <p className="text-sm text-muted mb-6">
                {"Vazifalaringizni tashkil qilish uchun loyiha kerak bo'ladi."}
              </p>
              <div className="space-y-4">
                <Input
                  label="Loyiha nomi"
                  placeholder="Masalan: Website Redesign"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Tavsif (ixtiyoriy)
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm bg-card outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={2}
                    placeholder="Qisqacha tavsif"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                  Orqaga
                </Button>
                <Button
                  onClick={handleFinish}
                  disabled={!projectName.trim()}
                  className="flex-1"
                >
                  {"Dashboardga o'tish"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}