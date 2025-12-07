import React from "react";
import Image from "next/image";
import { useRouter } from "next/router"; // gunakan router
import { Navbar as NavbarMolecule } from "../molecules/Navbar";

export const Navbar = () => {
  const router = useRouter();

  const navItems = [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang" },
    { id: "silabus", label: "Silabus" },
    { id: "galeri", label: "Galeri" },
    { id: "pendaftaran", label: "Pendaftaran" },
    { id: "bantuan", label: "Bantuan" },
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
      onNavClick={(id) => console.log("Navigate to section:", id)}
      onLoginClick={() => router.push("api/auth/Login")}
      onRegisterClick={() => router.push("api/auth/Register")}
    />
  );
};