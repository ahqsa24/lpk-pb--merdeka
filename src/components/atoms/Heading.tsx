import React from "react";
import { JSX } from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({ level = 1, children, className }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={`font-bold ${className ?? ""}`}>{children}</Tag>;
};