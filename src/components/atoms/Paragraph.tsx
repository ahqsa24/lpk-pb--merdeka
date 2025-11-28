import React from "react";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => (
  <p className={`text-gray-700 text-justify ${className ?? ""}`}>{children}</p>
);