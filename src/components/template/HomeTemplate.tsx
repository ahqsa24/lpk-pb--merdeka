import React from "react";
import { HeroSection } from "../organisms/HeroSection";
import { ProgramGrid } from "../organisms/ProgramGrid";

type ProgramType = {
  id: number;
  name: string;
  description: string;
};

type HomeTemplateProps = {
  programs: Array<ProgramType>;
};

export const HomeTemplate = ({ programs }: HomeTemplateProps) => {
  const programItems = programs.map((program) => ({
    id: program.id,
    title: program.name,
    img: "",
    desc: "",
  }));
  
  return (
  <main className="bg-red-50 mx-auto min-h-screen w-full">
      <HeroSection />
      <ProgramGrid list={programItems} />
  </main>
  )
};