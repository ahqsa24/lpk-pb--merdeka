import React, { useState } from "react";
import { TabButton } from "../atoms/TabButton";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabGroupProps {
  tabs: TabItem[];
  defaultTab?: string;
}

export const TabGroup: React.FC<TabGroupProps> = ({
  tabs,
  defaultTab = tabs[0]?.id,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="w-full space-y-6">
      {/* Tab Buttons */}
      <div className="flex gap-4 flex-wrap">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {/* Tab Content */}
      <div className="border rounded-lg p-8 bg-white min-h-96">
        {activeTabContent && activeTabContent.content}
      </div>
    </div>
  );
};
