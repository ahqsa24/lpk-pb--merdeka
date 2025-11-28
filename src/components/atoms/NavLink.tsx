import React from "react";

interface NavLinkProps {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  label,
  href = "#",
  onClick,
  active = false,
}) => (
  <a
    href={href}
    onClick={onClick}
    className={`text-sm font-medium transition-colors ${
      active
        ? "text-red-600"
        : "text-gray-700 hover:text-red-600"
    }`}
  >
    {label}
  </a>
);
