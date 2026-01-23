import React, { useState } from "react";
import { LeaderboardRow } from "../molecules/LeaderboardRow";
import { Button } from "../../shared/atoms"; // Assuming Button atom exists, otherwise standard button

interface LeaderboardEntry {
  id: number;
  title: string;
  description: string;
  avatar: string;
  score: number;
}
interface LeaderboardProps {
  data: LeaderboardEntry[];
  startRank?: number;
}

const ITEMS_PER_PAGE = 5;

export const LeaderboardTable: React.FC<LeaderboardProps> = ({ data, startRank = 1 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Optional: Scroll to top of table
  };

  return (
    <div className="space-y-6">
      <section className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
        <div className="flex flex-col dark:divide-y dark:divide-zinc-800">
          {currentData.map((entry, index) => (
            <LeaderboardRow
              key={entry.id}
              rank={startRank + startIndex + index}
              src={entry.avatar}
              title={entry.title}
              description={entry.description}
              score={entry.score}
            />
          ))}
        </div>
      </section>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
              ? 'bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed'
              : 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 text-red-600 hover:border-red-200'
              }`}
          >
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${currentPage === page
                  ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                  : 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
              ? 'bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed'
              : 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 text-red-600 hover:border-red-200'
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};