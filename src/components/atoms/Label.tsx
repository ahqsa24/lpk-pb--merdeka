import React from "react";

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return <label htmlFor={htmlFor} className="block mb-1 font-medium">{children}</label>;
};