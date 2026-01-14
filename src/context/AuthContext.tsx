import React, { createContext, useContext } from "react";
import { useRouter } from "next/router";
import { useSession, signOut as betterAuthSignOut } from "@/lib/auth-client";

interface User {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    image?: string | null;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    logout: () => void;
    isPending: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const isAuthenticated = !!session?.user;
    const user = session?.user ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: (session.user as any).role || 'user',
        image: session.user.image,
    } : null;

    const logout = async () => {
        await betterAuthSignOut();
        router.push("/auth/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, logout, isPending }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
