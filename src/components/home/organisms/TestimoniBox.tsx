import React from "react";
import Image from "next/image";
import { Paragraph } from "../../shared/atoms";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

interface TestimoniProps {
  src: string;
  comment: string;
  title: string;
  description: string;
  rating?: number;
}

export const TestimoniBox: React.FC<TestimoniProps> = ({
  src,
  comment,
  title,
  description,
  rating = 5,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative group">
      <div className="absolute top-6 right-8 text-red-100 dark:text-red-900/30 group-hover:text-red-50 dark:group-hover:text-red-900/50 transition-colors">
        <FaQuoteLeft size={40} />
      </div>

      <div className="flex items-center gap-4 mb-4 relative z-10">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-red-500 p-0.5 flex-shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white text-lg">{title}</h4>
          <p className="text-sm text-red-500 dark:text-red-400 font-medium">{description}</p>
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex gap-1 mb-4 relative z-10">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-zinc-700'}
            size={16}
          />
        ))}
      </div>

      <div className="flex-grow">
        <Paragraph className="text-gray-600 dark:text-gray-300 italic leading-relaxed relative z-10">
          "{comment}"
        </Paragraph>
      </div>
    </div>
  );
};
