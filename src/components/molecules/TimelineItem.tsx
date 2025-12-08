import React from "react";
import { Paragraph } from "../atoms";
import { FaBook, FaClipboardCheck, FaMedal } from "react-icons/fa"; // Example icons, adjust as needed

interface TimelineItemProps {
  number: string;
  title: string;
  description: string;
  list: string[];
  position: "left" | "right";
  icon?: React.ReactNode;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  number,
  title,
  description,
  list,
  position,
  icon
}) => {
  const isLeft = position === "left";

  return (
    <div className={`flex flex-col md:flex-row items-center w-full mb-12 relative group ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>

      {/* Content Card */}
      <div className={`w-full md:w-[45%] bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 relative z-10 ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xl">
            {icon || <FaBook />}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {list.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Arrow pointer decoration */}
        <div className={`hidden md:block absolute top-8 w-4 h-4 bg-white transform rotate-45 border-gray-100 ${isLeft ? "-right-2 border-r border-t" : "-left-2 border-l border-b"}`}></div>
      </div>

      {/* Center Marker */}
      <div className="flex flex-col items-center justify-center w-full md:w-[10%] my-6 md:my-0 relative z-20">
        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg shadow-md ring-4 ring-white">
          {number}
        </div>
      </div>

      {/* Spacer for the other side */}
      <div className="w-full md:w-[45%]"></div>

    </div>
  );
};
