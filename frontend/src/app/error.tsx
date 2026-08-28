"use client";

import { AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="text-danger" size={28} />
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-2">Nimadir xato ketdi</h1>
        <p className="text-sm text-muted mb-6 max-w-sm">
         {" Kutilmagan xatolik yuz berdi. Iltimos, qayta urinib ko'ring."}
        </p>
        <Button onClick={reset}>Qayta urinish</Button>
      </div>
    </div>
  );
}