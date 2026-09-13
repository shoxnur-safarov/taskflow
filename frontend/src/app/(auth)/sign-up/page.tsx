"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthShowcase from "@/components/auth/AuthShowcase";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Parollar mos kelmadi");
            return;
        }

        setIsLoading(true);
        try {
            await api.post("/auth/register", {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            });
            router.push("/onboarding");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Xatolik yuz berdi");
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex">
            {/* Chap taraf - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-8">
                <div className="w-full max-w-sm">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-foreground">TaskFlow</h1>
                        <p className="mt-2 text-2xl font-semibold text-foreground">Hisob yaratish</p>
                    </div>

                    {error && (
                        <div className="mb-4 px-3 py-2 rounded-lg bg-danger/10 text-danger text-sm">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            id="fullName"
                            label="To'liq ism"
                            type="text"
                            placeholder="Alisher Navoiy"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                        />
                        <Input
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="siz@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <Input
                            id="password"
                            label="Parol"
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
                            required
                        />

                        <Button type="submit" isLoading={isLoading} className="w-full mt-2">
                            Hisob yaratish
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-muted">
                        Hisobingiz bormi?{" "}
                        <Link href="/sign-in" className="text-primary font-medium hover:underline">
                            Kirish
                        </Link>
                    </p>
                </div>
            </div>

            {/* O'ng taraf - Banner (faqat desktop'da) */}
            <div className="hidden lg:flex lg:w-1/2">
                <AuthShowcase />
            </div>
        </div>
    );
}