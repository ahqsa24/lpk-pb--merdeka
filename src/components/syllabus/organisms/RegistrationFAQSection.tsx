import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { LineHeading } from "../../shared/molecules";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
}

const RegistrationFAQSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const res = await fetch('/api/cms/faq?category=Registration');
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

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (loading) {
        return (
            <section className="py-12">
                <div className="text-center mb-10">
                    <LineHeading title="FAQ Pendaftaran" />
                    <p className="text-gray-600 mt-4">
                        Pertanyaan umum seputar proses registrasi dan administrasi.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="animate-pulse bg-gray-100 h-20 rounded-2xl"></div>
                    ))}
                </div>
            </section>
        );
    }

    if (faqs.length === 0) {
        return (
            <section className="py-12">
                <div className="text-center mb-10">
                    <LineHeading title="FAQ Pendaftaran" />
                    <p className="text-gray-600 mt-4">
                        Pertanyaan umum seputar proses registrasi dan administrasi.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto text-center py-12 text-gray-500">
                    <p>Belum ada FAQ pendaftaran yang tersedia.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12">
            <div className="text-center mb-10">
                <LineHeading title="FAQ Pendaftaran" />
                <p className="text-gray-600 mt-4">
                    Pertanyaan umum seputar proses registrasi dan administrasi.
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={faq.id}
                        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === index ? 'border-red-200 bg-red-50 shadow-md' : 'border-gray-200 bg-white hover:border-red-100'
                            }`}
                    >
                        <button
                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className={`font-bold text-lg ${activeIndex === index ? 'text-red-700' : 'text-gray-800'}`}>
                                {faq.question}
                            </span>
                            <span className={`p-2 rounded-full transition-transform duration-300 ${activeIndex === index ? 'bg-red-200 text-red-700 rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                                {activeIndex === index ? <FaMinus size={14} /> : <FaPlus size={14} />}
                            </span>
                        </button>

                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-red-100/50">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RegistrationFAQSection;
