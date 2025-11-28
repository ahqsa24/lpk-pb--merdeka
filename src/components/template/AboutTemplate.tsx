import React from "react";
import { AboutSection } from "../organisms/AboutSection";
import { StatsGrid } from "../organisms/StatsGrid";

export const AboutTemplate = () => (
  <main className="p-6 max-w-6xl mx-auto">
    <StatsGrid />
    <AboutSection />
  </main>
);