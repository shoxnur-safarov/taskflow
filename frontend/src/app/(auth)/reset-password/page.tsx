"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthShowcase from "@/components/auth/AuthShowcase";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Parollar mos kelmadi");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          {!isSuccess ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">TaskFlow</h1>
                <p className="mt-2 text-2xl font-semibold text-foreground">{"Yangi parol o'rnating"}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  id="password"
                  label="Yangi parol"
                  type="password"
                  placeholder="Kamida 8 ta belgi"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <Input
                  id="confirmPassword"
                  label="Parolni tasdiqlang"
                  type="password"
                  placeholder="Parolni qayta kiriting"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  error={error}
                  required
                />
                <Button type="submit" isLoading={isLoading} className="w-full mt-2">
                  Parolni yangilash
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Parol yangilandi</h2>
              <p className="text-sm text-muted mb-6">
               {"Parolingiz muvaffaqiyatli o'zgartirildi. Endi yangi parol bilan kirishingiz mumkin."}
              </p>
              <Link href="/sign-in">
                <Button className="w-full">{"Kirish sahifasiga o'tish"}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2">
        <AuthShowcase />
      </div>
    </div>
  );
}