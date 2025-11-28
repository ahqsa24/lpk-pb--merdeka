import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={`rounded-2xl p-4 shadow-md bg-white ${className ?? ""}`}>{children}</div>
);