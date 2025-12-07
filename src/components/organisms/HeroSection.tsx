import React from "react";
import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";
import { Button } from "../atoms/Button";
import { TextBackground } from "../atoms/TextBackground";
import Image from "next/image";

export const HeroSection = () => (
  <section className="w-full flex flex-col items-center justify-center relative overflow-hidden">
    {/* Content Container */}
    <div className="px-12 lg:px-24 xl:px-48 w-full min-h-screen flex flex-col items-start justify-center gap-6 relative z-10">

    {/* Logo */}
    <div className="relative z-10 flex items-center gap-3 mb-2">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/Logo-Tab.png"
          alt="LPK Merdeka Logo"
          width={128}
          height={128}
          className="object-contain"
        />
      </div>
    </div>

    {/* Content */}
    <div className="relative max-w-4xl">
      <Heading level={6} className="text-5xl md:text-7xl font-bold text-red-600 mb-4">
        LPK PB Merdeka
      </Heading>
      <Paragraph variant="black" className="text-xl mb-6 leading-relaxed">
        Lembaga pelatihan resmi di bidang perdagangan berjangka, mencetak tenaga profesional dengan keterampilan siap kerja dan daya saing global.
      </Paragraph>
      <TextBackground className="text-lg">Kompetensi Kuat, Masa Depan Hebat</TextBackground>
      <div className="flex py-8 gap-4 text-xl flex-wrap">
        <Button>Daftar Program</Button>
      </div>
    </div>
    </div>
  </section>
);