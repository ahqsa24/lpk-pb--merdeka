import React from "react";
import { AvatarWithName } from "../molecules/AvatarWithName";
import { Heading } from "../atoms/Heading";

interface LeaderboardEntry {
  id: number;
  name: string;
  avatar: string;
  score: number;
}
interface LeaderboardProps {
  data: LeaderboardEntry[];
}
export const LeaderboardTable: React.FC<LeaderboardProps> = ({ data }) => (
  <section className="p-8 bg-white rounded-2xl shadow-md">
    <Heading level={2} className="text-xl mb-4">Leaderboard</Heading>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map(entry => (
        <div key={entry.id} className="flex items-center justify-between p-4 border rounded-xl">
          <AvatarWithName src={entry.avatar} name={entry.name} />
          <span className="font-bold text-red-600 text-lg">{entry.score}</span>
        </div>
      ))}
    </div>
  </section>
);