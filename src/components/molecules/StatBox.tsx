import React from "react";
import { Heading } from "../atoms/Heading";

interface StatBoxProps {
  number: number | string;
  label: string;
}

export const StatBox: React.FC<StatBoxProps> = ({ number, label }) => (
  <div className="flex flex-col text-amber-50 items-center justify-center p-2 rounded-2xl">
    <Heading level={2} className="text-3xl">{number}</Heading>
    <span className="text-lg">{label}</span>
  </div>
);