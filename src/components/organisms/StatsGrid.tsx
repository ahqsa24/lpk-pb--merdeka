import React from "react";
import { StatBox } from "../molecules/StatBox";

export const StatsGrid = () => (
  <section className="grid grid-cols-3 gap-4 p-4">
    <StatBox number={15} label="Program" />
    <StatBox number={1200} label="Peserta" />
    <StatBox number={25} label="Instruktur" />
  </section>
);