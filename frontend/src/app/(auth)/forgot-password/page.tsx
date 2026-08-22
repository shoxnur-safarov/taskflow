"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthShowcase from "@/components/auth/AuthShowcase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          {!isSent ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">TaskFlow</h1>
                <p className="mt-2 text-2xl font-semibold text-foreground">Parolni tiklash</p>
                <p className="mt-2 text-sm text-muted">
                  Email manzilingizni kiriting, biz sizga tiklash havolasini yuboramiz.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="siz@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" isLoading={isLoading} className="w-full mt-2">
                  Havola yuborish
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
              <h2 className="text-xl font-semibold text-foreground mb-2">Havola yuborildi</h2>
              <p className="text-sm text-muted">
                <span className="font-medium text-foreground">{email}</span> manziliga parolni
                tiklash havolasi yuborildi. Pochta qutingizni tekshiring.
              </p>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-muted">
            <Link href="/sign-in" className="text-primary font-medium hover:underline">
              ← Kirish sahifasiga qaytish
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2">
        <AuthShowcase />
      </div>
    </div>
  );
}