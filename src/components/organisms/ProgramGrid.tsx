import React from "react";
import { CardWithImage } from "../molecules/CardWithImage";

interface ProgramItem {
  id: number;
  title: string;
  img: string;
  desc: string;
}
interface ProgramGridProps {
  list: ProgramItem[];
}
export const ProgramGrid: React.FC<ProgramGridProps> = ({ list }) => (
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {list.map(program => (
      <CardWithImage key={program.id} img={program.img} title={program.title} text={program.desc} />
    ))}
  </section>
);