import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa';

interface Article {
    id: string;
    title: string;
    content: string;
    thumbnail_url: string | null;
    author: string | null;
    published_at: string;
    slug: string;
}

export default function ArticleDetailPage() {
    const router = useRouter();
    const { slug } = router.query;
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchArticle = async () => {
            try {
                const res = await fetch(`/api/cms/articles/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setArticle(data);
                } else {
                    // Handle 404 or error
                    console.error("Article not found");
                }
            } catch (error) {
                console.error("Failed to fetch article", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-zinc-950 flex justify-center items-center">
                <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col justify-center items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Artikel tidak ditemukan</h1>
                <Link href="/dashboard" className="text-red-600 hover:underline">Kembali ke Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen dark:bg-zinc-950">
            <Head>
                <title>{article.title} | LPK Merdeka</title>
            </Head>

            {/* Navbar / Header for Reader */}
            <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-20">
                <div className="w-full px-6 md:px-8 h-16 flex items-center">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors"
                    >
                        <FaArrowLeft />
                        <span className="font-medium">Kembali</span>
                    </button>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
                <article className="bg-transparent">
                    {/* Hero Image */}
                    {article.thumbnail_url && (
                        <div className="w-full h-72 md:h-[500px] relative rounded-2xl overflow-hidden mb-8">
                            <img
                                src={article.thumbnail_url}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white w-full">
                                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-shadow-sm">
                                    {article.title}
                                </h1>
                            </div>
                        </div>
                    )}

                    {/* Metadata (if no image, show title here) */}
                    {!article.thumbnail_url && (
                        <div className="pb-8 border-b border-gray-100 dark:border-zinc-800 mb-8">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                                {article.title}
                            </h1>
                        </div>
                    )}

                    {/* Meta Row */}
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-400 mb-10 pl-1">
                        {article.author && (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                                    <FaUser size={12} />
                                </div>
                                <span className="font-medium">{article.author}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt />
                            <span>{new Date(article.published_at).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaClock />
                            <span>{new Date(article.published_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="">
                        <div
                            className="prose prose-xl dark:prose-invert max-w-none 
                            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-a:text-red-600 hover:prose-a:text-red-700
                            prose-img:rounded-2xl prose-img:shadow-lg"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>
                </article>

                <div className="mt-8 text-center">
                    {/* (Optional) Bottom back button or share links could go here */}
                </div>
            </main>

            {/* Other News Section */}
            <div className="bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-red-600 pl-4">Berita Lainnya</h2>
                        <Link href="/dashboard" className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1">
                            Lihat Semua <FaArrowLeft className="rotate-180" size={12} />
                        </Link>
                    </div>

                    <OtherNewsList currentArticleId={article.id} />
                </div>
            </div>
        </div>
    );
}

function OtherNewsList({ currentArticleId }: { currentArticleId: string }) {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('/api/cms/articles');
                if (res.ok) {
                    const data = await res.json();
                    // Filter out current article and limit to 3
                    const others = data
                        .filter((a: Article) => a.id !== currentArticleId)
                        .slice(0, 3);
                    setArticles(others);
                }
            } catch (error) {
                console.error("Failed to fetch other articles");
            }
        };
        fetchArticles();
    }, [currentArticleId]);

    if (articles.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item) => (
                <Link key={item.id} href={`/dashboard/articles/${item.slug}`} className="group block bg-gray-50 dark:bg-zinc-950 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-zinc-800">
                    <div className="relative h-48 w-full overflow-hidden">
                        {item.thumbnail_url ? (
                            <img
                                src={item.thumbnail_url}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-4xl">📰</div>
                        )}
                    </div>
                    <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                            <span className="flex items-center gap-1"><FaCalendarAlt className="text-red-500" /> {new Date(item.published_at).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                            {item.title}
                        </h3>
                    </div>
                </Link>
            ))}
        </div>
    );
}
