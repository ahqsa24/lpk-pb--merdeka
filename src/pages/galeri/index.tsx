import React, { useState } from "react";
import { Layout } from "@/components/template/Layout";
import Head from "next/head";
import Image from "next/image";
import { LineHeading } from "@/components/molecules"; // Ensure this is available or use standard H1
import { FaPlay, FaCamera, FaVideo } from 'react-icons/fa';

// Define Types
type GalleryType = 'photo' | 'video';
type GalleryCategory = 'activity' | 'ceremony' | 'training' | 'culture';

interface GalleryItem {
    id: number;
    type: GalleryType;
    category: GalleryCategory;
    title: string;
    date: string;
    image: string; // Thumb for video
}

// Dummy Data
const galleryItems: GalleryItem[] = [
    {
        id: 1,
        type: 'photo',
        category: 'training',
        title: "Pelatihan Bahasa Jepang Intensif",
        date: "12 Okt 2023",
        image: "https://images.unsplash.com/photo-1540316281786-90c74f762634?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 2,
        type: 'video',
        category: 'activity',
        title: "Senam Pagi Bersama Siswa",
        date: "15 Okt 2023",
        image: "https://images.unsplash.com/photo-1571408854495-2cc675c2e921?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 3,
        type: 'photo',
        category: 'ceremony',
        title: "Upacara Kelulusan Angkatan 2023",
        date: "20 Okt 2023",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 4,
        type: 'photo',
        category: 'culture',
        title: "Pengenalan Budaya Minum Teh",
        date: "25 Okt 2023",
        image: "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 5,
        type: 'video',
        category: 'training',
        title: "Simulasi Wawancara Kerja",
        date: "01 Nov 2023",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 6,
        type: 'photo',
        category: 'activity',
        title: "Kunjungan Industri",
        date: "05 Nov 2023",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 7,
        type: 'photo',
        category: 'training',
        title: "Kelas Fisik & Disiplin",
        date: "10 Nov 2023",
        image: "https://images.unsplash.com/photo-1517863554189-9477e8dc2d63?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 8,
        type: 'video',
        category: 'culture',
        title: "Festival Musim Panas (Natsu Matsuri)",
        date: "15 Nov 2023",
        image: "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1600&auto=format&fit=crop",
    }
];

const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'photo', label: 'Foto' },
    { id: 'video', label: 'Video' },
    { id: 'activity', label: 'Kegiatan' },
    { id: 'training', label: 'Pelatihan' }
];

export default function GalleryPage() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredItems = galleryItems.filter(item => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'photo' || activeFilter === 'video') return item.type === activeFilter;
        return item.category === activeFilter;
    });

    return (
        <>
            <Head>
                <title>Galeri Kegiatan | LPK PB Merdeka</title>
                <meta name="description" content="Koleksi foto dan video kegiatan LPK PB Merdeka" />
            </Head>
            <Layout>
                <section className="bg-white py-20 min-h-screen">
                    <div className="container mx-auto px-6 lg:px-12 xl:px-24">

                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">Galeri Kami</h1>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Momen-momen berharga dari kegiatan pelatihan, budaya, dan keseruan siswa LPK PB Merdeka.
                            </p>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap justify-center gap-4 mb-16">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveFilter(cat.id)}
                                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === cat.id
                                            ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-105'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Masonry Grid */}
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                            {filteredItems.map(item => (
                                <div key={item.id} className="relative group break-inside-avoid rounded-2xl overflow-hidden bg-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer">

                                    {/* Image */}
                                    <div className="relative w-full">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={800} // width doesn't matter much in masonry w-full, but needed for NextImg
                                            height={600}
                                            className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                        {/* Type Icon (Top Right) */}
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white border border-white/30">
                                            {item.type === 'video' ? <FaPlay size={12} className="ml-0.5" /> : <FaCamera size={14} />}
                                        </div>

                                        {/* Content (Bottom) */}
                                        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg mb-2">
                                                {item.category.toUpperCase()}
                                            </span>
                                            <h3 className="text-white font-bold text-lg leading-tight mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm">{item.date}</p>
                                        </div>

                                        {/* Centered Play Button for Video */}
                                        {item.type === 'video' && (
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white border-2 border-white group-hover:scale-110 transition-transform duration-300">
                                                <FaPlay size={24} className="ml-1" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredItems.length === 0 && (
                            <div className="text-center py-20 text-gray-500">
                                <p>Tidak ada media ditemukan untuk kategori ini.</p>
                            </div>
                        )}

                    </div>
                </section>
            </Layout>
        </>
    );
}
