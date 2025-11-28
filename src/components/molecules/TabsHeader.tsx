import React from "react";
import { TabButton } from "../atoms/TabButton";

interface TabsHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: {
    key: string;
    label: string;
    icon?: React.ReactNode;
  }[];
}

export const TabsHeader: React.FC<TabsHeaderProps> = ({
  activeTab,
  onTabChange,
  tabs
}) => {
  return (
    <div className="flex flex-row gap-2 sm:gap-8 mt-8 sm:mt-10 md:mt-12 justify-between bg-red-600 dark:bg-gray-700/50 py-2 rounded-xl hover:bg-red-600/80 dark:hover:bg-gray-600/60 transition-all duration-300 animate-slide-in-up delay-200">
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          label={tab.label}
          icon={tab.icon}
          active={activeTab === tab.key}
          onClick={() => onTabChange(tab.key)}
        />
      ))}
    </div>
  );
};