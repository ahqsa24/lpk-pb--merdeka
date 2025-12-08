import React from "react";
import { Heading } from "../atoms";
import { Paragraph } from "../atoms";
import { Button } from "../atoms";
import { TextBackground } from "../atoms";
import Image from "next/image";

export const HeroSection = () => (
  <section className="w-full flex flex-col items-center justify-center relative overflow-hidden bg-white min-h-[90vh]">
    {/* Decorative Background Blobs */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 pointer-events-none">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-40 -right-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    {/* Content Container */}
    <div className="container mx-auto px-6 lg:px-12 xl:px-24 w-full flex flex-col-reverse md:flex-row items-center justify-between relative z-10 gap-12 py-12 md:py-0">

      {/* Left Content (Text) */}
      <div className="w-full md:w-1/2 flex flex-col items-start gap-6 text-left">
        {/* Logo Tag */}
        <div className="flex items-center gap-2 bg-red-50 py-1.5 px-4 rounded-full border border-red-100 mb-2 shadow-sm">
          <Image
            src="/assets/Logo-Tab.png"
            alt="LPK Merdeka Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="text-sm font-semibold text-red-700">LPK PB Merdeka</span>
        </div>

        <Heading level={1} className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
          Kompetensi Kuat, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
            Masa Depan Hebat
          </span>
        </Heading>

        <Paragraph variant="black" className="text-lg md:text-xl leading-relaxed max-w-lg">
          Lembaga pelatihan resmi di bidang perdagangan berjangka, mencetak tenaga profesional dengan keterampilan siap kerja dan daya saing global.
        </Paragraph>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
          <Button variant="primary" className="px-8 py-4 text-lg shadow-lg shadow-red-200">
            Daftar Program
          </Button>
          <Button variant="secondary" className="px-8 py-4 text-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-700">
            Tentang Kami
          </Button>
        </div>

        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100 w-full">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                <Image src={`https://via.placeholder.com/40?text=U${i}`} width={40} height={40} alt="User" />
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">500+</span> Alumni Sukses
          </div>
        </div>
      </div>

      {/* Right Content (Image) */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
        <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
          <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-pink-500 rounded-[2rem] transform rotate-6 opacity-20"></div>
          <div className="absolute inset-0 bg-white rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white transform -rotate-3 transition-transform hover:rotate-0 duration-500">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
              alt="Students Learning"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
            <div className="p-3 bg-green-100 text-green-600 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Resmi</p>
              <p className="text-sm font-bold text-gray-800">Terakreditasi BNSP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);