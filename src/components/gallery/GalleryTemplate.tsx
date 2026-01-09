import React from 'react';
import GallerySection from './organisms/GallerySection';
import { ScrollReveal } from "../shared/molecules/ScrollReveal";

const GalleryTemplate = () => {
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <ScrollReveal>
                        <div className="inline-block mb-4">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-semibold">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                                </svg>
                                Galeri Kami
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                            Galeri Kegiatan
                        </h1>
                        <p className="text-lg text-gray-600">
                            Dokumentasi momen berharga dari berbagai kegiatan pelatihan, seminar, dan aktivitas komunitas kami
                        </p>
                    </ScrollReveal>
                </div>

                {/* Gallery Content */}
                <ScrollReveal width="100%">
                    <GallerySection />
                </ScrollReveal>
            </div>
        </div>
    );
};

export default GalleryTemplate;
