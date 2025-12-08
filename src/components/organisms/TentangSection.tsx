import React from "react";
import { LineHeading } from "../molecules";
import { aboutData } from "./TentangSection.data";
import Image from "next/image";
import { FaBullseye, FaRocket } from "react-icons/fa"; // Icons for Vision/Mission

export const TentangSection = () => {
  const { intro, vision, mission, goals } = aboutData;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12 xl:px-24 flex flex-col gap-24">

        {/* Intro Section - Split Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="inline-block px-4 py-2 bg-red-50 text-red-600 font-bold rounded-full text-sm w-fit border border-red-100">
              {intro.title}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {intro.heading}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed text-justify">
              {intro.description}
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              {/* Placeholder for Intro Image */}
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                alt="About Us Team"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-red-100/50 rounded-3xl"></div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-gradient-to-br from-white to-red-50 p-8 rounded-3xl border border-red-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">
              <FaBullseye />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{vision.title}</h3>
            <h4 className="text-lg font-semibold text-red-600 mb-4">{vision.heading}</h4>
            <p className="text-gray-600 leading-relaxed">{vision.description}</p>
          </div>

          {/* Mission Card */}
          <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">
              <FaRocket />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{mission.title}</h3>
            <h4 className="text-lg font-semibold text-blue-600 mb-4">{mission.heading}</h4>
            <p className="text-gray-600 leading-relaxed">{mission.description}</p>
          </div>
        </div>

        {/* Goals Section */}
        <div className="flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto">
            <LineHeading title="Tujuan Kami" />
            <p className="text-gray-600 mt-4">Kami berdedikasi untuk memberikan dampak nyata melalui pendidikan yang berkualitas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <div key={index} className="flex gap-6 p-6 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition-colors duration-300 group bg-white shadow-sm hover:shadow-md">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-red-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <goal.icon size={32} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-bold text-gray-900">{goal.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">{goal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
