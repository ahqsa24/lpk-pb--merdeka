import React, { useState } from "react";
import { TabsHeader } from "@/components/molecules/TabsHeader";
import { HiChatAlt2, HiStar } from "react-icons/hi";

const Testimoni = () => {
  const [activeTab, setActiveTab] = useState("testimoni");

  const tabs = [
    {
      key: "testimoni",
      label: "Testimoni",
      icon: <HiChatAlt2 className="w-full h-full" />
    },
    {
      key: "leaderboard",
      label: "Leaderboard",
      icon: <HiStar className="w-full h-full" />
    }
  ];

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-48 py-12 sm:py-16">
      {/* Header */}
      <div className="flex flex-col justify-center items-center animate-fade-in">
        <h1 className="text-xl text-red-600 sm:text-2xl md:text-4xl font-bold mb-6 text-gradient-red-via-maroon-to-orange">
          Testimoni & Leaderboard
        </h1>
      </div>

      {/* Tabs */}
      <TabsHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      />

      {/* Content Area — now empty */}
      <div className="mt-6 sm:mt-10 p-5 bg-red-600 dark:bg-gray-700/50 rounded-xl animate-fade-in text-amber-50">
        {activeTab === "testimoni" && (
          <div className="text-center text-lg">Testimoni</div>
        )}

        {activeTab === "leaderboard" && (
          <div className="text-center text-lg">Leaderboard</div>
        )}
      </div>
    </div>
  );
};

export default Testimoni;