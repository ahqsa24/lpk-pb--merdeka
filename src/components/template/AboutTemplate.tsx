import React from "react";
import { AboutSection } from "../organisms/AboutSection";
import { StatsGrid } from "../organisms/StatsGrid";

export const AboutTemplate = () => (
  <main className="w-full mx-auto">
    <StatsGrid />
    <div className="mx-auto px-48">
      <AboutSection />
    </div>
  </main>
);