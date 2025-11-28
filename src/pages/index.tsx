import { Open_Sans, Poppins } from "next/font/google";
import { Navbar } from "../components/organisms/Navbar";
import Beranda from "./home/Beranda";
import MisiTujuan from "./about/MisiTujuan";
import TentangKami from './about/TentangKami';
import Testimoni from "./testimoni/Testimoni";
import Galeri from "./galery/Galeri";
import Sylabus from "./sylabus/Sylabus";
import Program from "./sylabus/Program";
import FAQ from "./contact/FAQ";
import { Footer }  from "../components/organisms/Footer";

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
    <div className={`${poppins.className} flex flex-col min-h-screen bg-white font-sans`}>
      <div className="relative">
        
        <Beranda />
        <TentangKami />
        <MisiTujuan />
        <Testimoni />
        <Galeri />
        <Sylabus />
        <Program />
        <FAQ />
        <Footer />

        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-md">
          <Navbar />
        </nav>

      </div>
    </div>
  );
}