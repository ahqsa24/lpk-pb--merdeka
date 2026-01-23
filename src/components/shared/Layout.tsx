import React, { ReactNode } from "react";
import { Navbar } from "@/components/shared/organisms/Navbar";
import { Footer } from "@/components/shared/organisms/Footer";

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={`flex flex-col min-h-screen font-sans transition-colors bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100`}>
            <div className="relative">
                <Navbar />

                <div className="pt-24"> {/* Added padding to prevent navbar overlap */}
                    {children}
                </div>

                <Footer />
            </div>
        </div>
    );
};
