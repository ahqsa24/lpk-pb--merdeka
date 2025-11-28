import React from "react";
import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";
import Image from "next/image";

export const AboutSection = () => (
  <section className="grid grid-cols-1 md:flex md:flex-row gap-8 items-center p-8">
    <div>
      <Image
        src="/assets/Building.png"
        alt="About LPK PB Merdeka"
        width={1200}
        height={900}
        className="object-contain" 
      />
    </div>
    <div className="flex flex-col gap-4 px-8">
      <div>
        <Heading level={2} className="text-red-600 text-3xl mb-2">Tentang Kami</Heading>
        <Paragraph className="text-xl">
          Lembaga Pelatihan Kompetensi Perdagangan Berjangka (LPK PB) adalah lembaga resmi yang bergerak di bidang pendidikan dan pelatihan perdagangan berjangka. Kami berkomitmen membekali peserta dengan keterampilan praktis, sertifikasi kompetensi, dan wawasan industri yang relevan untuk mendukung karier di sektor keuangan berjangka.
        </Paragraph>
      </div>
      <div>
        <Heading level={2} className="text-red-600 text-3xl mb-2">Visi</Heading>
        <Paragraph className="text-xl">
          Menjadi lembaga pelatihan terdepan dalam mencetak tenaga kerja profesional, kompeten, dan berdaya saing global di bidang perdagangan berjangka.
        </Paragraph>
      </div>
    </div>
  </section>
);