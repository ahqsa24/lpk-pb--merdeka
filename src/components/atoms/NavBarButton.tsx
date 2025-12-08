import React from "react";

interface NavBarButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
}

export const NavBarButton: React.FC<NavBarButtonProps> = ({
  label,
  variant = "primary",
  onClick,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-white text-red-600 hover:bg-gray-100 shadow-md";
      case "ghost":
        return "bg-transparent text-white hover:bg-white/10 border border-transparent hover:border-white/20";
      default: // primary
        return "bg-red-600 text-white hover:bg-red-700";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${getVariantClasses()}`}
    >
      {label}
    </button>
  );
};
