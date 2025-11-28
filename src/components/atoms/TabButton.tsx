import React from "react";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  label,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
      isActive
        ? "bg-red-600 text-white"
        : "bg-transparent text-gray-700 border-2 border-gray-400 hover:border-gray-600"
    }`}
  >
    {label}
  </button>
);
