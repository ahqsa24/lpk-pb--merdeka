import React from 'react';
import { motion } from 'framer-motion';

interface FilterOption {
    id: string;
    label: string;
}

interface GalleryFilterProps {
    filters: FilterOption[];
    activeFilter: string;
    onFilterChange: (id: string) => void;
}

const GalleryFilter: React.FC<GalleryFilterProps> = ({ filters, activeFilter, onFilterChange }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter, index) => (
                <motion.button
                    key={filter.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onFilterChange(filter.id)}
                    className={`
                        relative px-6 py-2.5 rounded-full text-sm font-semibold 
                        transition-all duration-300 overflow-hidden
                        ${activeFilter === filter.id
                            ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }
                    `}
                >
                    {/* Active indicator */}
                    {activeFilter === filter.id && (
                        <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-red-600 -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{filter.label}</span>
                </motion.button>
            ))}
        </div>
    );
};

export default GalleryFilter;
