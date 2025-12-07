import { LineHeading } from "../molecules";
import { TextGroup } from "../molecules";
import { CardWithAvatar } from "../molecules";
import {
  BookOpen,
  Laptop,
  GraduationCap,
  Medal,
} from "lucide-react";

export const TentangSection = () => (
  <section className="px-12 lg:px-24 xl:px-48 items-start grid grid-cols-1 gap-16 p-8 py-24">
    <div className="grid grid-cols-1 gap-32">
      <TextGroup
        heading="Apa Itu LPK PB Merdeka?"
        title="Tentang Kami"
        text="Lembaga Pelatihan Kompetensi Perdagangan Berjangka (LPK PB) adalah lembaga resmi yang bergerak di bidang pendidikan dan pelatihan perdagangan berjangka. Kami berkomitmen membekali peserta dengan keterampilan praktis, sertifikasi kompetensi, dan wawasan industri yang relevan untuk mendukung karier di sektor keuangan berjangka."
        className="flex flex-col max-w-7xl my-auto"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-32 max-w-full">
      <TextGroup
        heading="Sejuta digital talent untuk Indonesia"
        title="Visi LPK PB Merdeka"
        text="Menjadi lembaga pelatihan terdepan dalam mencetak tenaga kerja profesional, kompeten, dan berdaya saing global di bidang perdagangan berjangka."
        className="flex flex-col max-w-xl"
      />
      <TextGroup
        heading="To train, certify, and connect youth to jobs"
        title="Misi LPK PB Merdeka"
        text="Itulah misi kami. Dengan proses pembelajaran yang menarik dan efektif, siapapun dapat belajar digital skills, mendapatkan sertifikasi, dan tentunya siap kerja!"
        className="flex flex-col max-w-xl"
      />
    </div>

    <div className="flex flex-col gap-8 mt-16">
      <LineHeading title="Tujuan" />

      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-8">
        <CardWithAvatar
          icon={<BookOpen size={48} className="text-white"/>}
          title="Kurikulum Berdasarkan Kebutuhan Industri"
          description="Hemat waktu dan biaya! Kurikulum Skilvul dibuat agar lebih mudah dimengerti dan sesuai dengan kebutuhan industri. Hampir 50% peserta berasal dari background non-IT dan 90% lulusan berhasil mendapatkan pekerjaan setelahnya."
        />

        <CardWithAvatar
          icon={<Laptop size={48} className="text-white"/>}
          title="Metode 'Blended-Learning'"
          description="Proses pembelajaran menggunakan metode 'blended-learning' yaitu secara online dan offline. Kamu dapat mengikuti kelas online dan sekaligus bertanya langsung kepada para mentor. Metode ini akan lebih efektif karena proses mengajar dua arah."
        />

        <CardWithAvatar
          icon={<GraduationCap size={48} className="text-white"/>}
          title="Personalisasi Proses Pembelajaran"
          description="Dengan adanya SkilPath, kamu bebas memilih spesialisasi yang diinginkan agar dapat disesuaikan dengan kebutuhan industri saat ini."
        />

        <CardWithAvatar
          icon={<Medal size={48} className="text-white"/>}
          title="Sertifikasi"
          description="Kamu akan mendapatkan SkilBadge setiap kali berhasil menyelesaikan sebuah kelas. SkilBadge tersebut dapat digunakan sebagai sertifikasi pada saat job hunting lho!."
        />
      </div>
    </div>
  </section>
);
