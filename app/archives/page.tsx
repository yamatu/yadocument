'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

interface Article {
    id: number;
    title: string;
    slug: string;
    created_at: string;
    category: string;
}

interface ArchiveGroup {
    date: string;
    articles: Article[];
}

import { API_URL } from '../../utils/config';

export default function ArchivesPage() {
    const [archives, setArchives] = useState<ArchiveGroup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArchives = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/archives`);
                setArchives(response.data);
            } catch (error) {
                console.error('Failed to fetch archives:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArchives();
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-slate-900 mb-3">文章归档</h1>
                        <p className="text-slate-600">按时间浏览所有文章</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {archives.map((group) => (
                                <div key={group.date} className="bg-white rounded-xl border border-slate-200 p-6">
                                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sky-600">calendar_month</span>
                                        {group.date}
                                    </h2>
                                    <div className="space-y-3">
                                        {group.articles.map((article) => (
                                            <Link
                                                key={article.id}
                                                href={`/articles/${article.slug}`}
                                                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                                            >
                                                <div className="flex-1">
                                                    <h3 className="text-sm font-medium text-slate-900 group-hover:text-sky-600 transition-colors">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-xs text-slate-500 mt-1">{article.category}</p>
                                                </div>
                                                <span className="text-xs text-slate-400">
                                                    {new Date(article.created_at).toLocaleDateString()}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
