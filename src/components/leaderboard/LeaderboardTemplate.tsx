import React from "react";
import { LeaderboardTable } from "./organisms";
import { LineHeading } from "../shared/molecules";
import { FaCrown, FaMedal, FaTrophy } from "react-icons/fa";
import { Avatar } from "../shared/atoms";
import { motion } from "framer-motion";

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

export const LeaderboardTemplate = ({ data }: LeaderboardTemplateProps) => {
  const sortedData = [...data].sort((a, b) => b.score - a.score);
  const topThree = sortedData.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Define ranking styles
  const rankStyles = [
    {
      rank: 1,
      color: "from-yellow-400 to-yellow-600",
      borderColor: "border-yellow-400",
      shadowColor: "shadow-yellow-500/30",
      icon: <FaCrown className="text-yellow-500 text-3xl mb-1 shadow-glow" />,
      height: "h-64",
      scale: 1.1,
      order: "md:order-2 order-1", // Changed: Added md: prefix and mobile order
    },
    {
      rank: 2,
      color: "from-slate-300 to-slate-500",
      borderColor: "border-slate-300",
      shadowColor: "shadow-slate-400/20",
      icon: <FaMedal className="text-slate-400 text-2xl mb-1" />,
      height: "h-56",
      scale: 1.0,
      order: "md:order-1 order-2", // Changed: Added md: prefix and mobile order
    },
    {
      rank: 3,
      color: "from-orange-500 to-orange-700",
      borderColor: "border-orange-500",
      shadowColor: "shadow-orange-600/20",
      icon: <FaTrophy className="text-orange-600 text-xl mb-1" />,
      height: "h-48",
      scale: 0.95,
      order: "md:order-3 order-3", // Changed: Added md: prefix and mobile order
    },
  ];

  // Reorder for visual podium: 2, 1, 3
  const visualPodium = [rankStyles[1], rankStyles[0], rankStyles[2]];

  return (
    <main className="px-6 lg:px-24 xl:px-48 py-24 mx-auto transition-colors overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <span className="px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-4 inline-block shadow-sm">
          Wall of Fame
        </span>
        <LineHeading title="The LPK Champions" className="text-5xl font-black" />
        <p className="text-gray-600 dark:text-zinc-400 mt-6 max-w-2xl mx-auto text-lg">
          Rayakan pencapaian terbaik siswa kami. Teruslah belajar, berlatih, dan jadilah yang terbaik di bidangmu!
        </p>
      </motion.div>

      {/* Podium Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-center items-end gap-8 md:gap-6 mt-20 mb-20 max-w-5xl mx-auto"
      >
        {visualPodium.map((style, index) => {
          const user = topThree.find((_, i) => i === style.rank - 1);
          if (!user) return null;

          return (
            <motion.div
              key={user.id}
              variants={itemVariants}
              whileHover={{ scale: style.scale + 0.02, zIndex: 20 }}
              className={`flex flex-col items-center w-full md:w-1/3 transition-all duration-500 ${style.order}`}
            >
              {/* Profile Area */}
              <div className="relative mb-16 z-30 transform transition-transform duration-500 group-hover:scale-105">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 scale-75 md:scale-100">
                  {style.icon}
                </div>

                <div className={`relative rounded-full p-1.5 bg-gradient-to-br ${style.color} shadow-xl ${style.shadowColor} ring-4 ring-white dark:ring-zinc-900`}>
                  <Avatar
                    src={user.avatar || ''}
                    name={user.title}
                    size={style.rank === 1 ? 120 : style.rank === 2 ? 100 : 90}
                    className="border-2 border-white dark:border-zinc-800"
                  />
                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center font-black text-xl shadow-lg border-2 ${style.borderColor} ${style.rank === 1 ? 'text-yellow-600' : style.rank === 2 ? 'text-slate-500' : 'text-orange-600'}`}>
                    {style.rank}
                  </div>
                </div>
              </div>

              {/* Podium Card */}
              <div className={`w-full group relative -mt-12 z-10`}>
                <div className={`absolute inset-0 bg-gradient-to-b ${style.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-[2.5rem] blur-2xl`} />
                <div className={`relative w-full bg-white dark:bg-zinc-900/90 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-zinc-800 border-t-8 ${style.borderColor} flex flex-col items-center pt-20 pb-8 px-6 text-center transform-gpu transition-all duration-300`}>
                  <h3 className={`font-black text-zinc-900 dark:text-white w-full ${style.rank === 1 ? 'text-xl' : 'text-lg'} mb-1.5 z-20`}>
                    {user.title}
                  </h3>
                  <div className="px-3 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 mb-4">
                    <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                      {user.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className={`font-black tracking-tighter ${style.rank === 1 ? 'text-4xl text-yellow-600' : 'text-3xl text-zinc-600 dark:text-zinc-300'}`}>
                      {user.score.toLocaleString()}
                    </span>
                    <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.3em] mt-2">XP POINTS</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="max-w-6xl mx-auto pt-20"
      >
        <div className="flex items-center justify-between mb-12 px-6">
          <div className="flex flex-col">
            <h2 className="text-3xl font-black flex items-center gap-4 text-zinc-900 dark:text-white">
              <span className="p-3 rounded-2xl bg-red-600 text-white shadow-lg shadow-red-500/20">
                <FaTrophy size={20} />
              </span>
              Rising Stars
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">Siswa berbakat lainnya yang terus berkembang</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 px-6 py-3 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <span className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Rank 4 - {sortedData.length}</span>
          </div>
        </div>
        <LeaderboardTable data={sortedData.slice(3)} startRank={4} />
      </motion.div>
    </main>
  );
};