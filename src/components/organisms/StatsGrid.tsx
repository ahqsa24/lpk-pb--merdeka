// components/organisms/StatsGrid.tsx
import React from "react";
import { StatBox } from "../molecules";

const stats = [
  { number: 10, label: "Unit Kompetisi" },
  { number: "98%", label: "Positive Review" },
  { number: "200+", label: "Peserta" },
  { number: 2, label: "Program Pelatihan" },
  { number: 25, label: "Instruktur Bersertifikasi" },
  { number: "100%", label: "Lulusan Terserap" },
];

export const StatsGrid = () => (
  <section className="bg-red-600 overflow-hidden py-8">
    <div className="flex whitespace-nowrap animate-scroll">
      {/* Set 1 */}
      <div className="flex gap-16 pr-16">
        {stats.map((stat, index) => (
          <StatBox key={`s1-${index}`} number={stat.number} label={stat.label} />
        ))}
      </div>

      {/* Set 2 (Duplicate) */}
      <div className="flex gap-16 pr-16">
        {stats.map((stat, index) => (
          <StatBox key={`s2-${index}`} number={stat.number} label={stat.label} />
        ))}
      </div>
    </div>
  </section>
);
