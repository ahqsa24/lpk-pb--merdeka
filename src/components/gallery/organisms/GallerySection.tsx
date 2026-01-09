import React, { useState, useEffect } from 'react';
import GalleryFilter from "../molecules/GalleryFilter";
import GalleryGrid from './GalleryGrid';
import { GalleryItemProps } from "../molecules/GalleryItem";

const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'photo', label: 'Foto' },
    { id: 'video', label: 'Video' }
];

const GallerySection = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [galleryItems, setGalleryItems] = useState<GalleryItemProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch('/api/cms/gallery');
                if (res.ok) {
                    const data = await res.json();
                    // Transform API data to match GalleryItemProps
                    const transformedData: GalleryItemProps[] = data.map((item: any) => ({
                        id: parseInt(item.id),
                        type: item.type === 'video' ? 'video' : 'photo',
                        category: (item.category || 'activity') as any,
                        title: item.title || 'Untitled',
                        date: new Date(item.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        }),
                        image: item.image_url
                    }));
                    setGalleryItems(transformedData);
                }
            } catch (error) {
                console.error('Failed to fetch gallery', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    const filteredItems = galleryItems.filter(item => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'photo' || activeFilter === 'video') return item.type === activeFilter;
        return item.category === activeFilter;
    });

    if (loading) {
        return (
            <div className="space-y-8">
                <GalleryFilter
                    filters={categories}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-2xl mb-6"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Filters */}
            <GalleryFilter
                filters={categories}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />

            {/* Grid */}
            <GalleryGrid items={filteredItems} />
        </div>
    );
};

export default GallerySection;
