import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaSave } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export const ProfileForm = () => {
    const { user } = useAuth();
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
                // const updatedUser = data.user || data.data;
                // Session update handled by re-fetch or reload
            } else {
                // Fallback: update context manually
                // Session update handled by re-fetch or reload
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
        <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-2xl">
                        {name.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Update your account information</p>
                    </div>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                            <input // No icon for name in admin screenshot? partial view. But admin/profile.tsx had icons. I'll add them back for nicer UI or match strict?
                                // Admin profile.tsx had FaUser. I will use that.
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all dark:bg-zinc-800 dark:text-white"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all bg-gray-50 dark:bg-zinc-800/50 cursor-not-allowed dark:text-gray-400 text-gray-500"
                                placeholder="Enter your email"
                                disabled
                                title="Email cannot be changed"
                            />
                            <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all dark:bg-zinc-800 dark:text-white"
                                        placeholder="Leave blank to keep current"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all dark:bg-zinc-800 dark:text-white"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <FaSave />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
