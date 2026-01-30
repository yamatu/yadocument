'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

interface Category {
    Category: string;
    Count: number;
}

import { API_URL } from '../../utils/config';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/categories`);
                console.log('Categories raw data:', response.data);

                const validCategories = (response.data || []).filter((cat: Category) => {
                    return cat.Category && cat.Category.trim() !== '';
                });

                console.log('Filtered categories:', validCategories);
                setCategories(validCategories);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setError('无法加载分类数据');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-slate-900 mb-3">文档分类</h1>
                        <p className="text-slate-600">浏览所有文档分类 (共 {categories.length} 个)</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg inline-block">
                                {error}
                            </div>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="bg-white rounded-xl border border-slate-200 p-12">
                                <span className="material-symbols-outlined text-slate-400 text-6xl block mb-4">folder_off</span>
                                <h3 className="text-lg font-semibold text-slate-700 mb-2">暂无分类</h3>
                                <p className="text-slate-500">还没有创建任何分类</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((category, index) => (
                                <Link
                                    key={`${category.Category}-${index}`}
                                    href={`/?category=${encodeURIComponent(category.Category)}`}
                                    className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                                                {category.Category}
                                            </h3>
                                            <p className="text-sm text-slate-500">{category.Count} 篇文章</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-400 flex items-center justify-center text-white flex-shrink-0 ml-4">
                                            <span className="material-symbols-outlined">folder</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
