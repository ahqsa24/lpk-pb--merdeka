import React from "react";
import { Avatar } from "../../shared/atoms";
import { Paragraph } from "../../shared/atoms";


interface LeaderboardRowProps {
    rank: number;
    src: string;
    title: string;
    description: string;
    score: number;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ rank, src, title, description, score }) => {
    return (
        <div className="flex items-center p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-red-100 dark:hover:border-red-900/30 group">
            {/* Rank Section */}
            <div className="w-12 flex-shrink-0 flex items-center justify-center">
                <span className="font-bold text-gray-400 dark:text-gray-500 text-lg group-hover:text-red-500 transition-colors">#{rank}</span>
            </div>

            {/* Avatar Section */}
            <div className="flex-shrink-0 mr-4">
                <Avatar src={src} size={56} className="ring-2 ring-gray-100 dark:ring-zinc-800 group-hover:ring-red-100 dark:group-hover:ring-red-900/40 group-hover:scale-110 transition-all duration-300" />
            </div>

            {/* Info Section */}
            <div className="flex-grow min-w-0 mr-4">
                <h4 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{description}</p>
            </div>

            {/* Score Section */}
            <div className="flex-shrink-0 text-right">
                <span className="block font-bold text-red-600 dark:text-red-400 text-lg">{score}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">XP</span>
            </div>
        </div>
    );
};
