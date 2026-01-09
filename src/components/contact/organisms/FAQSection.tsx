import React, { useState, useEffect } from 'react';
import AccordionItem from "../molecules/AccordionItem";
import { Heading } from "../../shared/atoms";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
}

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const res = await fetch('/api/cms/faq?category=General');
                if (res.ok) {
                    const data = await res.json();
                    setFaqs(data);
                }
            } catch (error) {
                console.error('Failed to fetch FAQs', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFAQs();
    }, []);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) {
        return (
            <div className="w-full">
                <div className="mb-8">
                    <Heading className="text-2xl mb-2">Frequently Asked Questions (FAQ)</Heading>
                    <p className="text-gray-500 text-sm">Jawaban cepat untuk pertanyaan umum seputar program kami.</p>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse bg-gray-100 h-16 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (faqs.length === 0) {
        return (
            <div className="w-full">
                <div className="mb-8">
                    <Heading className="text-2xl mb-2">Frequently Asked Questions (FAQ)</Heading>
                    <p className="text-gray-500 text-sm">Jawaban cepat untuk pertanyaan umum seputar program kami.</p>
                </div>
                <div className="text-center py-12 text-gray-500">
                    <p>Belum ada FAQ yang tersedia.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <Heading className="text-2xl mb-2">Frequently Asked Questions (FAQ)</Heading>
                <p className="text-gray-500 text-sm">Jawaban cepat untuk pertanyaan umum seputar program kami.</p>
            </div>

            <div className="space-y-1">
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={faq.id}
                        title={faq.question}
                        content={faq.answer}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
