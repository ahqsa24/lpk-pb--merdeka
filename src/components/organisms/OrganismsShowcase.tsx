import React from "react";
import { Heading } from "../atoms/Heading";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { StatsGrid } from "./StatsGrid";
import { LeaderboardTable } from "./LeaderboardTable";
import { ProgramGrid } from "./ProgramGrid";

export const OrganismsShowcase = () => (
  <div className="w-full space-y-8">
    <Heading level={2} className="text-3xl font-bold">Organisms</Heading>

    {/* HeroSection */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">HeroSection</Heading>
      <HeroSection />
    </div>

    {/* AboutSection */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">AboutSection</Heading>
      <AboutSection />
    </div>

    {/* StatsGrid */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">StatsGrid</Heading>
      <StatsGrid />
    </div>

    {/* ProgramGrid */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">ProgramGrid</Heading>
      <ProgramGrid list={[
        {
          id: 1,
          title: "Web Development",
          img: "https://via.placeholder.com/300x200",
          desc: "Pelajari pemrograman web modern dengan teknologi terkini"
        },
        {
          id: 2,
          title: "Digital Marketing",
          img: "https://via.placeholder.com/300x200",
          desc: "Kuasai strategi marketing digital untuk bisnis online"
        },
        {
          id: 3,
          title: "UI/UX Design",
          img: "https://via.placeholder.com/300x200",
          desc: "Desain interface yang menarik dan user experience terbaik"
        }
      ]} />
    </div>

    {/* LeaderboardTable */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">LeaderboardTable</Heading>
      <LeaderboardTable data={[
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
