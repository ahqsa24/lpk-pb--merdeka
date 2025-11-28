import React from "react";
import { Heading } from "../atoms/Heading";

interface StatBoxProps {
  number: number | string;
  label: string;
}

export const StatBox: React.FC<StatBoxProps> = ({ number, label }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-red-100 rounded-2xl">
    <Heading level={2} className="text-red-600 text-3xl">{number}</Heading>
    <span className="text-gray-700">{label}</span>
  </div>
);