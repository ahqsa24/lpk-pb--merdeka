import React from "react";
import { MissionCard } from "../molecules/MissionCard";

export const MissionSection = () => {
  const missions = [
    {
      img: "/icons/mission1.png",
      title: "Profesional",
      text: "Membangun karakter profesional dalam setiap peserta."
    },
    {
      img: "/icons/mission2.png",
      title: "Kreatif",
      text: "Mendorong kreativitas agar mampu bersaing."
    },
    {
      img: "/icons/mission3.png",
      title: "Berintegritas",
      text: "Menanamkan nilai integritas dalam kehidupan."
    },
    {
      img: "/icons/mission4.png",
      title: "Inovatif",
      text: "Selalu berinovasi mengikuti perkembangan zaman."
    }
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-4 px-8">
      {missions.map((item, index) => (
        <MissionCard 
          key={index}
          img={item.img}
          title={item.title}
          text={item.text}
        />
      ))}
    </section>
  );
};
