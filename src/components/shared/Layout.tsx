import React, { ReactNode } from "react";
import { Navbar } from "@/components/shared/organisms/Navbar";
import { Footer } from "@/components/shared/organisms/Footer";

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={`flex flex-col min-h-screen font-sans transition-colors`}>
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
