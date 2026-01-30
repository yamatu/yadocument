'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

interface Tag {
    name: string;
    count: number;
}

import { API_URL } from '../../utils/config';

export default function TagsPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/tags`);
                setTags(response.data || []);
            } catch (error) {
                console.error('Failed to fetch tags:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTags();
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-slate-900 mb-3">标签云</h1>
                        <p className="text-slate-600">浏览所有标签</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 p-8">
                            <div className="flex flex-wrap gap-3">
                                {tags.map((tag) => (
                                    <Link
                                        key={tag.name}
                                        href={`/?tag=${encodeURIComponent(tag.name)}`}
                                        className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 hover:text-sky-800 rounded-lg font-medium transition-all hover:shadow-md"
                                    >
                                        #{tag.name}
                                        <span className="ml-2 text-sm text-sky-400">{tag.count}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
