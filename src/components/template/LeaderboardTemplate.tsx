import React from "react";
import { LeaderboardTable } from "../organisms/LeaderboardTable";

type LeaderboardData = {
  id: number;
  name: string;
  avatar: string;
  score: number;
};

type LeaderboardTemplateProps = {
  data: LeaderboardData[];
};

export const LeaderboardTemplate = ({ data }: LeaderboardTemplateProps) => (
  <main className="p-6 max-w-6xl mx-auto">
    <LeaderboardTable data={data} />
  </main>
);