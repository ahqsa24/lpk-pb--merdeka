import React from "react";
import { Heading } from "../atoms/Heading";
import { HomeTemplate } from "./HomeTemplate";
import { AboutTemplate } from "./AboutTemplate";
import { LeaderboardTemplate } from "./LeaderboardTemplate";
import { ProgramTemplate } from "./ProgramTemplate";

export const TemplateShowcase = () => (
  <div className="w-full space-y-8">
    <Heading level={2} className="text-3xl font-bold">Templates</Heading>

    {/* HomeTemplate */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">HomeTemplate</Heading>
      <HomeTemplate programs={[
        { id: 1, name: "Web Development", description: "Learn web development" },
        { id: 2, name: "Mobile App", description: "Learn mobile development" },
        { id: 3, name: "UI/UX Design", description: "Learn UI/UX design" }
      ]} />
    </div>

    {/* AboutTemplate */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">AboutTemplate</Heading>
      <AboutTemplate />
    </div>

    {/* ProgramTemplate */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">ProgramTemplate</Heading>
      <ProgramTemplate programs={[
        { id: 1, name: "Web Development" },
        { id: 2, name: "Digital Marketing" },
        { id: 3, name: "UI/UX Design" }
      ]} />
    </div>

    {/* LeaderboardTemplate */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">LeaderboardTemplate</Heading>
      <LeaderboardTemplate data={[
        {
          id: 1,
          name: "Ahmad Rizki",
          avatar: "https://via.placeholder.com/56",
          score: 950
        },
        {
          id: 2,
          name: "Siti Nurhaliza",
          avatar: "https://via.placeholder.com/56",
          score: 920
        },
        {
          id: 3,
          name: "Budi Santoso",
          avatar: "https://via.placeholder.com/56",
          score: 890
        }
      ]} />
    </div>
  </div>
);
