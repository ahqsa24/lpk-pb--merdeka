import React, { useState, useEffect } from "react";
import { NavBarButton } from "../atoms/NavBarButton";

export interface NavItem {
  id: string;
  label: string;
  href?: string;
}

interface NavbarProps {
  logo?: React.ReactNode;
  navItems: NavItem[];
  onNavClick?: (id: string) => void;
  onLoginClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  navItems,
  onNavClick,
  onLoginClick,
}) => {
  const [activeNav, setActiveNav] = useState(navItems[0]?.id);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    onNavClick?.(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? "backdrop-blur-md bg-red-600/80" : "bg-red-600"} text-white mt-4 rounded-full shadow-lg w-11/12 max-w-7xl`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {logo ? logo : <span className="font-bold text-xl">LPK</span>}
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm transition-colors ${
                activeNav === item.id
                  ? "font-bold text-white border-b-2 border-white pb-2"
                  : "font-medium text-red-100 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Login Button */}
        <NavBarButton label="Daftar" variant="secondary" onClick={onLoginClick} />
      </div>
    </nav>
  );
};
