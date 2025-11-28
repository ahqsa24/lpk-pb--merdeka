import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", children, ...props }) => {
  const base = "px-12 py-2 rounded-full font-medium transition-all";
  const styles = variant === "primary" ? "bg-red-600 text-white hover:bg-red-800" : "bg-white text-red-600 border border-red-600";
  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
};