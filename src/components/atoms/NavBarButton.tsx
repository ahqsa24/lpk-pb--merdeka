import React from "react";

interface NavBarButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export const NavBarButton: React.FC<NavBarButtonProps> = ({
  label,
  variant = "primary",
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full font-medium transition-all ${
      variant === "primary"
        ? "bg-red-600 text-white hover:bg-red-700"
        : "bg-white text-red-600 hover:bg-gray-100"
    }`}
  >
    {label}
  </button>
);
