"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/shared/atoms/Input";
import { Label } from "@/components/shared/atoms/Label";

export default function ResetPassword() {
    const router = useRouter();
    const { token } = router.query;
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setError("Password dan konfirmasi password tidak cocok");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Gagal reset password");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/auth/login");
            }, 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Token Tidak Valid</h2>
                    <p className="text-gray-600 mb-4">Link reset password tidak valid atau sudah kadaluarsa.</p>
                    <Link href="/auth/forgot-password" className="text-red-600 font-semibold hover:text-red-700">
                        Minta Link Baru
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Reset Password | LPK PB Merdeka</title>
            </Head>
            <div className="h-screen w-screen overflow-hidden flex bg-white">
                {/* Left Side - Image/Branding */}
                <div className="hidden lg:flex w-1/2 bg-red-600 items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply"></div>
                    <div className="z-10 text-center p-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Buat Password Baru</h2>
                        <p className="text-red-100 text-lg max-w-md mx-auto">
                            Pastikan password baru Anda kuat dan mudah diingat.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 dark:bg-zinc-950">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
                            <p className="text-gray-500 mt-2">Masukkan password baru Anda</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md animate-in fade-in">
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {success ? (
                            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-md">
                                <h3 className="text-green-800 font-semibold mb-2">Password Berhasil Direset!</h3>
                                <p className="text-green-700 text-sm mb-4">
                                    Password Anda telah berhasil diubah. Anda akan dialihkan ke halaman login...
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="password">Password Baru</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={8}
                                            className="dark:bg-zinc-800 dark:text-white dark:border-zinc-700 pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
                                        >
                                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter</p>
                                </div>

                                <div>
                                    <Label htmlFor="password_confirmation">Konfirmasi Password Baru</Label>
                                    <div className="relative">
                                        <Input
                                            id="password_confirmation"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={passwordConfirmation}
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            required
                                            minLength={8}
                                            className="dark:bg-zinc-800 dark:text-white dark:border-zinc-700 pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
                                        >
                                            {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </button>
                                    </div>
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
                                            Memproses...
                                        </span>
                                    ) : "Reset Password"}
                                </button>

                                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                    <Link href="/auth/login" className="text-red-600 font-semibold hover:text-red-700 transition-colors">
                                        ← Kembali ke Login
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
