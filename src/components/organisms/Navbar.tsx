import React from "react";
import Image from "next/image";
import { Navbar as NavbarMolecule } from "../molecules/Navbar";

export const Navbar = () => {
  const navItems = [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang" },
    { id: "testimoni", label: "Testimoni" },
    { id: "galeri", label: "Galeri" },
    { id: "silabus", label: "Silabus" },
    { id: "kontak", label: "Kontak" },
  ];

  return (
    <NavbarMolecule
      logo={
        <div className="flex items-center gap-3">
          <Image
            src="/assets/LPK-White.png"
            alt="LPK Merdeka Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
      }
      navItems={navItems}
      onNavClick={(id) => console.log("Navigated to:", id)}
      onLoginClick={() => console.log("Login clicked")}
    />
  );
};
