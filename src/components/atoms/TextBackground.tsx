import React from "react";

interface TextParagraph {
  children: React.ReactNode;
  className?: string;
}

export const TextBackground: React.FC<TextParagraph> = ({ children, className }) => (
  <div className="flex justify-left my-4">
    <span className={`text-neutral-100 px-4 py-2 font-bold-italic rounded-lg font-bold bg-red-600 ${className ?? ""}`}>{children}</span>
  </div>
);