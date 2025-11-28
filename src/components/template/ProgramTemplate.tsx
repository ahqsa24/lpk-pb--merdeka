import React from "react";
import { ProgramGrid } from "../organisms/ProgramGrid";

type Program = {
  id: number;
  name: string;
};

type ProgramTemplateProps = {
  programs: Program[];
};

export const ProgramTemplate = ({ programs }: ProgramTemplateProps) => {
  const programItems = programs.map((program) => ({
    id: program.id,
    title: program.name,
    img: "",
    desc: "",
  }));

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Pelatihan Program</h1>
      <ProgramGrid list={programItems} />
    </main>
  );
};