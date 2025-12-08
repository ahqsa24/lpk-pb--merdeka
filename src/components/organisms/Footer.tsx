import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTiktok, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-red-600 text-red-50 pt-16 pb-8">
            <div className="container mx-auto px-6 lg:px-12 xl:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                                <span className="text-red-600 font-bold text-xl">L</span>
                            </div>
                            <span className="text-white text-xl font-bold">LPK PB Merdeka</span>
                        </div>
                        <p className="text-red-100 leading-relaxed text-sm">
                            Mencetak talenta digital berstandar global. Bergabunglah dengan kami dan mulai perjalanan karir masa depan Anda.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Menu Utama</h3>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                            <li><Link href="/sylabus" className="hover:text-white transition-colors">Silabus</Link></li>
                            <li><Link href="/galeri" className="hover:text-white transition-colors">Galeri</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Bantuan</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Hubungi Kami</h3>
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-white flex-shrink-0" />
                                <span className="text-sm">Jl. Jend. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-white flex-shrink-0" />
                                <span className="text-sm">info@lpkpbmerdeka.id</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaWhatsapp className="text-white flex-shrink-0" />
                                <span className="text-sm">+62 812-3456-7890</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Ikuti Kami</h3>
                        <p className="text-red-100 text-sm mb-6">Dapatkan update terbaru seputar program dan kegiatan kami.</p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-red-600 transition-colors border border-white/20 hover:border-white">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-red-600 transition-colors border border-white/20 hover:border-white">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-red-600 transition-colors border border-white/20 hover:border-white">
                                <FaLinkedinIn />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-red-600 transition-colors border border-white/20 hover:border-white">
                                <FaTiktok />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-red-500 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-red-100">
                    <p className="text-sm text-center md:text-left">
                        &copy; 2025 LPK PB Merdeka. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};