"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthShowcase from "@/components/auth/AuthShowcase";

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">TaskFlow</h1>
            <p className="mt-2 text-2xl font-semibold text-foreground">Xush kelibsiz</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="siz@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <div>
              <Input
                id="password"
                label="Parol"
                type="password"
                placeholder="Parolingiz"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <div className="mt-2 text-right">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Parolni unutdingizmi?
                </Link>
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full mt-2">
              Kirish
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            {"Hisobingiz yo'qmi? "}
            <Link href="/sign-up" className="text-primary font-medium hover:underline">
              {"Ro'yxatdan o'tish"}
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