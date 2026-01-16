import React, { useEffect, useState } from "react";
import { HeroSection, StatsGrid, TestimoniSection } from "./organisms";
import { LeaderboardTemplate } from "../leaderboard/LeaderboardTemplate";
import { ScrollReveal } from "../shared/molecules/ScrollReveal";

export const HomeTemplate = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/public/leaderboard');
        if (res.ok) {
          const data = await res.json();
          setLeaderboardData(data);
        }
      } catch (error) {
        console.error("Failed to fetch public leaderboard", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <main className="mx-auto">
      <HeroSection />
      <ScrollReveal width="100%">
        <StatsGrid />
      </ScrollReveal>
      {leaderboardData.length >= 10 && (
        <ScrollReveal width="100%">
          <LeaderboardTemplate data={leaderboardData} />
        </ScrollReveal>
      )}
      <ScrollReveal width="100%">
        <TestimoniSection />
      </ScrollReveal>
    </main>
  )
};