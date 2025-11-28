import React from "react";
import { StatBox } from "../molecules/StatBox";

export const StatsGrid = () => (
  <section className="bg-red-600 grid grid-cols-4 py-8 px-64">
    <StatBox number={10} label="Pelatihan" />
    <StatBox number={"98%"} label="Positive Review" />
    <StatBox number={"200+"} label="Peserta" />
    <StatBox number={2} label="Program Pelatihan" />
  </section>
);