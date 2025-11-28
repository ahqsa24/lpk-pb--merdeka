import { Open_Sans, Poppins } from "next/font/google";
import { Heading } from "../components/atoms";
import { Navbar } from "../components/organisms/Navbar";
import { AtomsShowcase } from "../components/atoms/AtomsShowcase";
import { MoleculesShowcase } from "../components/molecules/MoleculesShowcase";
import { OrganismsShowcase } from "../components/organisms/OrganismsShowcase";
import { TemplateShowcase } from "../components/template/TemplateShowcase";
import Beranda from "./home/Beranda";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // opsional sesuai kebutuhan
});

export default function Home() {
  return (
    <div
      className={`${poppins.className} flex flex-col min-h-screen bg-white font-sans`}
    >
      {/* Beranda Page */}
      <div className="relative">
        <Beranda />
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-50 bg-white">
          <Navbar />
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center py-12">
        <div className="w-full max-w-7xl px-6 md:px-16 space-y-12">
          <div className="w-full">
            <Heading level={1} className="text-4xl font-bold mb-2">Component Showcase</Heading>
          </div>

          {/* Atoms Showcase */}
          <section className="w-full border-t pt-8">
            <AtomsShowcase />
          </section>

          {/* Molecules Showcase */}
          <section className="w-full border-t pt-8">
            <MoleculesShowcase />
          </section>

          {/* Organisms Showcase */}
          <section className="w-full border-t pt-8">
            <OrganismsShowcase />
          </section>

          {/* Templates Showcase */}
          <section className="w-full border-t pt-8 pb-8">
            <TemplateShowcase />
          </section>
        </div>
      </main>
    </div>
  );
}