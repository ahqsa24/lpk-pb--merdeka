import React from "react";
import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";

export const AboutSection = () => (
  <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
    <div className="w-full h-64 md:h-80 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl shadow-lg flex items-center justify-center">
      <span className="text-white text-4xl font-bold">Building Image</span>
    </div>
    <div>
      <Heading level={2} className="text-2xl mb-2">Tentang Kami</Heading>
      <Paragraph>
        Lembaga Pelatihan Kompetensi Perdagangan Berjangka (LPK PB) adalah lembaga resmi yang bergerak di bidang pendidikan dan pelatihan perdagangan berjangka. Kami berkomitmen membekali peserta dengan keterampilan praktis, sertifikasi kompetensi, dan wawasan industri yang relevan untuk mendukung karier di sektor keuangan berjangka.
      </Paragraph>
    </div>
  </section>
);