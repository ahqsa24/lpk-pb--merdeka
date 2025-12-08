import React from "react";
import { LineHeading } from "../molecules";
import { TimelineItem } from "../molecules/TimelineItem";
import { FaBook, FaClipboardCheck, FaMedal } from "react-icons/fa";

export const StrukturSection = () => {
  return (
    <section className="relative px-6 lg:px-24 xl:px-48 py-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 mb-16">
        <LineHeading title="Struktur Program" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Central Vertical Line */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-red-200 via-red-500 to-red-200 transform -translate-x-1/2"></div>

        <div className="flex flex-col">

          <TimelineItem
            number="1"
            title="Tahap Pelatihan"
            description="Peserta akan mengikuti sesi pembelajaran terstruktur yang mencakup materi dasar hingga lanjutan"
            list={[
              "Teori dan Konsep Dasar",
              "Studi Kasus",
              "Simulasi dan Praktik",
              "Diskusi dan Konsultasi Materi",
            ]}
            position="left"
            icon={<FaBook />}
          />

          <TimelineItem
            number="2"
            title="Tahap Assessment (Uji Kompetensi)"
            description="Setelah pelatihan selesai, peserta mengikuti ujian penilaian kemampuan oleh Assessor Kompetensi LSP PB sesuai standar BNSP"
            list={[
              "Ujian tertulis",
              "Observasi praktik",
              "Wawancara kompetensi",
              "Penelusuran bukti portofolio",
            ]}
            position="right"
            icon={<FaClipboardCheck />}
          />

          <TimelineItem
            number="3"
            title="Kompeten & Sertifikasi"
            description="Peserta yang dinilai kompeten akan mendapatkan"
            list={[
              "Sertifikat Kompetensi Resmi dari BNSP",
              "Legalitas sebagai Wakil Penasihat Berjangka",
              "Hak untuk berpraktik secara profesional",
              "Kesempatan remedial assessment tanpa mengulang pelatihan",
            ]}
            position="left"
            icon={<FaMedal />}
          />
        </div>
      </div>
    </section>
  );
};