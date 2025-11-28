import React from "react";

interface TabButtonProps {
  active?: boolean;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  active,
  label,
  icon,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`group flex flex-col gap-2 mx-auto items-center py-3 sm:py-4 w-full sm:w-[45%] rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg 
        ${
          active
            ? "bg-yellow-50 dark:bg-gradient-to-r dark:from-gradientRed dark:via-gradientMaroon dark:to-gradientOrange text-gradientMaroon dark:text-amber-50 shadow-xl shadow-gradientRed/30"
            : "text-gray-300 hover:text-white hover:bg-gray-600/30"
        }
      `}
    >
      {icon ? (
        <div className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      ) : null}

      <p className="text-sm sm:text-base group-hover:font-semibold transition-all duration-300">
        {label}
      </p>
    </div>
  );
};
