import React from "react";
import Image from "next/image";
import { Paragraph } from "../atoms";
import { FaQuoteLeft } from "react-icons/fa";

interface TestimoniProps {
  src: string;
  comment: string;
  title: string;
  description: string;
}

export const TestimoniBox: React.FC<TestimoniProps> = ({
  src,
  comment,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative group">
      <div className="absolute top-6 right-8 text-red-100 group-hover:text-red-50 transition-colors">
        <FaQuoteLeft size={40} />
      </div>

      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-red-500 p-0.5 flex-shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
          <p className="text-sm text-red-500 font-medium">{description}</p>
        </div>
      </div>

      <div className="flex-grow">
        <Paragraph className="text-gray-600 italic leading-relaxed relative z-10">
          "{comment}"
        </Paragraph>
      </div>
    </div>
  );
};
