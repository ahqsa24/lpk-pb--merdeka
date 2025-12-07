import React, { useState, useEffect } from "react";
import { NavBarButton } from "../atoms/NavBarButton";
import { FaBars, FaTimes } from "react-icons/fa"; // import icon hamburger

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
  onRegisterClick?: () => void;
}


export const Navbar: React.FC<NavbarProps> = ({
  logo,
  navItems,
  onNavClick,
  onLoginClick,
  onRegisterClick,
}) => {
  const [activeNav, setActiveNav] = useState(navItems[0]?.id);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    onNavClick?.(id);
    setIsMenuOpen(false); // close when clicked
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-red-600/80" : "bg-red-600"
      } text-white shadow-lg w-full`}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {logo ? logo : <span className="font-bold text-xl">LPK</span>}
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm transition-colors ${
                activeNav === item.id
                  ? "font-bold text-white border-b-2 border-white"
                  : "font-medium text-red-100 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop buttons on right */}
        <div className="hidden md:flex items-center gap-2">
          <NavBarButton label="Login" variant="secondary" onClick={onLoginClick} />
          <NavBarButton label="Daftar" variant="secondary" onClick={onRegisterClick} />
        </div>


        {/* Mobile hamburger icon */}
        <button
          className="md:hidden text-2xl"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-red-600 flex flex-col px-6 py-4 gap-4 animate-slide-down">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-white text-left text-lg font-medium"
            >
              {item.label}
            </button>
          ))}

          <NavBarButton label="Login" variant="secondary" onClick={onLoginClick} />
          <NavBarButton label="Daftar" variant="secondary" onClick={onLoginClick} />
        </div>
      )}
    </nav>
  );
};
