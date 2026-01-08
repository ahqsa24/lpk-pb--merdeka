import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaSave } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export const ProfileForm = () => {
    const { user, login } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token tidak ditemukan, silakan login ulang.");

            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

            const payload: any = {
                name,
                email,
            };

            if (password) {
                payload.password = password;
                payload.password_confirmation = passwordConfirmation;
            }

            const response = await fetch(`${API_URL}/user`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(payload),
            });

            let data;
            const responseText = await response.text();
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                throw new Error(`Error sistem (${response.status})`);
            }

            if (!response.ok) {
                if (data.errors) {
                    const errorMsgs = Object.values(data.errors).flat().join(", ");
                    throw new Error(errorMsgs);
                }
                throw new Error(data.message || "Gagal memperbarui profil");
            }

            // Update local user context if API returns new user data
            // Usually PUT /user should return the updated user object
            if (data.user || data.data) {
                const updatedUser = data.user || data.data;
                // We preserve the token
                login(token, updatedUser);
            } else {
                // Fallback: update context manually with form data
                // Note: id and role might be missing if we just construct it from form
                // so better to rely on API response or re-fetch
                login(token, { ...user, name, email });
            }

            setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
            setPassword("");
            setPasswordConfirmation("");
        } catch (err: any) {
            setMessage({ type: "error", text: err.message || "Terjadi kesalahan" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-zinc-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Edit Profil</h2>

            {message && (
                <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-zinc-800 dark:text-white outline-none transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-zinc-800 dark:text-white outline-none transition"
                            required
                        />
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-zinc-800 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Ganti Password (Opsional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password Baru
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-zinc-800 dark:text-white outline-none transition"
                                    placeholder="Kosongkan jika tidak ingin mengganti"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Konfirmasi Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-zinc-800 dark:text-white outline-none transition"
                                    placeholder="Ulangi password baru"
                                    required={!!password}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition shadow-lg shadow-red-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <FaSave /> Simpan Perubahan
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
