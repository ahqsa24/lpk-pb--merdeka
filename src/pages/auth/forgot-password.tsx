"use client";

import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Input } from "@/components/shared/atoms/Input";
import { Label } from "@/components/shared/atoms/Label";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Gagal mengirim email reset password");
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Lupa Password | LPK PB Merdeka</title>
            </Head>
            <div className="h-screen w-screen overflow-hidden flex bg-white">
                {/* Left Side - Image/Branding */}
                <div className="hidden lg:flex w-1/2 bg-red-600 items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply"></div>
                    <div className="z-10 text-center p-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Lupa Password?</h2>
                        <p className="text-red-100 text-lg max-w-md mx-auto">
                            Jangan khawatir, kami akan mengirimkan instruksi untuk reset password Anda.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 dark:bg-zinc-950">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
                            <p className="text-gray-500 mt-2">
                                Masukkan email Anda dan kami akan mengirimkan link untuk reset password
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md animate-in fade-in">
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {success ? (
                            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-md">
                                <h3 className="text-green-800 font-semibold mb-2">Email Terkirim!</h3>
                                <p className="text-green-700 text-sm mb-4">
                                    Kami telah mengirimkan link reset password ke email Anda. Silakan cek inbox atau folder spam.
                                </p>
                                <Link
                                    href="/auth/login"
                                    className="text-red-600 font-semibold hover:text-red-700 transition-colors text-sm"
                                >
                                    ← Kembali ke Login
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="nama@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-red-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Mengirim...
                                        </span>
                                    ) : "Kirim Link Reset Password"}
                                </button>

                                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                    Ingat password Anda?{" "}
                                    <Link href="/auth/login" className="text-red-600 font-semibold hover:text-red-700 transition-colors">
                                        Masuk
                                    </Link>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
