import React, { useState, useEffect } from "react";
import { NavBarButton } from "../atoms";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa"; // import icon hamburger
import { useTheme } from "@/context/ThemeContext";

export interface NavItem {
  id: string;
  label: string;
  href?: string;
}

interface NavbarProps {
  logo?: React.ReactNode;
  navItems: NavItem[];
  activeId?: string;
  onNavClick?: (id: string) => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}


export const Navbar: React.FC<NavbarProps> = ({
  logo,
  navItems,
  activeId,
  onNavClick,
  onLoginClick,
  onRegisterClick,
}) => {
  const [internalActiveNav, setInternalActiveNav] = useState(navItems[0]?.id);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const currentActiveNav = activeId || internalActiveNav;

  const handleNavClick = (id: string) => {
    if (!activeId) {
      setInternalActiveNav(id);
    }
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "backdrop-blur-md bg-red-600/90 shadow-lg" : "bg-red-600"
        } text-white w-full border-b border-transparent`}
    >
      <div className="container mx-auto px-6 lg:px-12 xl:px-24 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {logo ? logo : <span className="font-bold text-xl">LPK</span>}
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm px-5 py-2 rounded-full transition-all duration-300 font-medium ${currentActiveNav === item.id
                ? "bg-white text-red-600 shadow-lg"
                : "text-red-50 hover:bg-red-500/50 hover:text-white"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop buttons on right */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <NavBarButton label="Masuk" variant="ghost" onClick={onLoginClick} />
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
