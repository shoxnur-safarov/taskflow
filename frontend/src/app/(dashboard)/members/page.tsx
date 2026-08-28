"use client";

import { useState } from "react";
import { UserPlus, MoreVertical } from "lucide-react";
import Button from "@/components/ui/Button";
import { mockMembers, mockPendingInvites } from "@/lib/mockData";
import InviteMemberModal from "@/components/members/InviteMemberModal";

const roleLabel: Record<string, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
};

const roleBadgeColor: Record<string, string> = {
  owner: "bg-primary-light text-primary",
  admin: "bg-priority-medium/10 text-priority-medium",
  member: "bg-muted-bg text-muted",
};

export default function MembersPage() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{"A'zolar"}</h1>
          <p className="text-sm text-muted mt-1">
            {mockMembers.length} {"a'zo,"} {mockPendingInvites.length} {"kutilayotgan taklif"}
          </p>
        </div>
        <Button onClick={() => setIsInviteOpen(true)} className="w-full sm:w-auto">
          <UserPlus size={16} className="mr-1.5" />
          {"A'zo taklif qilish"}
        </Button>
      </div>

      {/* Active Members */}
      <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
        <div className="px-4 sm:px-5 py-3 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">{"Faol a'zolar"}</h2>
        </div>
        {mockMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-border last:border-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-sm font-medium">
                {member.fullName.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{member.fullName}</p>
                <p className="text-xs text-muted truncate">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${roleBadgeColor[member.role]}`}>
                {roleLabel[member.role]}
              </span>
              {member.role !== "owner" && (
                <button className="p-1.5 text-muted hover:text-foreground rounded-lg hover:bg-muted-bg">
                  <MoreVertical size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pending Invitations */}
      {mockPendingInvites.length > 0 && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 sm:px-5 py-3 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Kutilayotgan takliflar</h2>
          </div>
          {mockPendingInvites.map((invite) => (
            <div
              key={invite.id}
              className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-muted-bg flex-shrink-0 flex items-center justify-center text-muted text-sm font-medium">
                  {invite.email.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{invite.email}</p>
                  <p className="text-xs text-muted">{roleLabel[invite.role]} sifatida taklif qilingan</p>
                </div>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-warning/10 text-warning flex-shrink-0">
                Kutilmoqda
              </span>
            </div>
          ))}
        </div>
      )}

      <InviteMemberModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
    </div>
  );
}