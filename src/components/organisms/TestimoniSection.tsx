// components/organisms/TestimoniSection.tsx
import { LineHeading } from "../molecules";
import { TestimoniBox } from "./TestimoniBox";

const testimonialData = [
  {
    src: "/assets/Logo-Tab.png",
    comment:
      "Pelatihan yang diberikan benar-benar bermanfaat dan aplikatif. Saya bisa langsung menerapkan materi yang dipelajari ke dalam proyek nyata, dan hasilnya sangat terasa dalam peningkatan kemampuan saya.",
    title: "Ahmad Qaulan Sadida",
    description: "Web Developer",
  },
  {
    src: "/assets/Logo-Tab.png",
    comment:
      "Instruktur sangat profesional, sabar, dan penyampaiannya mudah dipahami bahkan oleh pemula. Setiap sesi selalu disertai contoh praktis, sehingga proses belajar menjadi lebih efektif dan menyenangkan.",
    title: "Nabila Rahmadani",
    description: "UI/UX Designer",
  },
  {
    src: "/assets/Logo-Tab.png",
    comment:
      "Materinya lengkap, terstruktur, dan sesuai kebutuhan dunia kerja saat ini. Saya menjadi lebih percaya diri karena keahlian yang saya miliki semakin terasah dan relevan dengan kebutuhan industri.",
    title: "Fajar Saputra",
    description: "Data Analyst",
  },
  {
    src: "/assets/Logo-Tab.png",
    comment:
      "Lingkungan belajar yang suportif membuat saya semakin termotivasi. Mentor dan peserta saling mendukung satu sama lain sehingga proses pembelajaran terasa ringan dan menyenangkan.",
    title: "Siti Aisyah",
    description: "Cloud Engineer",
  },
  {
    src: "/assets/Logo-Tab.png",
    comment:
      "Setelah menyelesaikan program dan mengikuti bimbingan karier, saya berhasil mendapatkan pekerjaan yang sesuai dengan keahlian saya. Pengalaman ini benar-benar sangat berharga dan membuka banyak peluang baru.",
    title: "Rizky Mahendra",
    description: "Mobile Developer",
  },
  {
    src: "/assets/Logo-Tab.png",
    comment:
      "Program ini sangat saya rekomendasikan bagi siapa pun yang ingin memulai karier di bidang teknologi. Materi yang disampaikan mudah diikuti dan dukungan mentor benar-benar membantu perkembangan saya.",
    title: "Dewi Kurniawati",
    description: "DevOps Engineer",
  },
];

export const TestimoniSection = () => (
  <section className="px-12 lg:px-24 xl:px-48 items-start py-24">
    <LineHeading title="Testimoni" />

    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mt-12">
      {testimonialData.map((item, index) => (
        <TestimoniBox
          key={index}
          src={item.src}
          comment={item.comment}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  </section>
);
