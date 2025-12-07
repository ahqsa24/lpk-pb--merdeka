import React from "react";
import { LeaderboardTable } from "../organisms/LeaderboardTable";

type LeaderboardData = {
  id: number;
  title: string;
  description: string;
  avatar: string;
  score: number;
};

type LeaderboardTemplateProps = {
  data: LeaderboardData[];
};

export const LeaderboardTemplate = ({ data }: LeaderboardTemplateProps) => (
  <main className="px-12 lg:px-24 xl:px-48 py-16 mx-auto">
    <LeaderboardTable data={data} />
  </main>
);