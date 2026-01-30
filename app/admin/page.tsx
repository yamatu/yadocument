'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

interface Article {
    id?: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    category: string;
    platform: string;
    tags: string;
    author: string;
    status: string;
}

import { API_URL } from '../../utils/config';

export default function AdminPage() {
    const router = useRouter();
    const [articles, setArticles] = useState<Article[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState<Article>({
        title: '',
        slug: '',
        description: '',
        content: '',
        category: 'General',
        platform: '',
        tags: '',
        author: 'Admin',
        status: 'Published'
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
            } else {
                setIsAuthenticated(true);
                setIsLoading(false);
            }
        }
    }, [router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchArticles();
        }
    }, [isAuthenticated]);

    const fetchArticles = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/articles`);
            setArticles(response.data);
        } catch (error) {
            console.error('Failed to fetch articles:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${API_URL}/api/articles/${editingId}`, formData);
            } else {
                await axios.post(`${API_URL}/api/articles`, formData);
            }
            setFormData({
                title: '',
                slug: '',
                description: '',
                content: '',
                category: 'General',
                platform: '',
                tags: '',
                author: 'Admin',
                status: 'Published'
            });
            setEditingId(null);
            fetchArticles();
        } catch (error) {
            console.error('Failed to save article:', error);
            alert('Failed to save article');
        }
    };

    const handleEdit = (article: Article) => {
        setEditingId(article.id!);
        setFormData({
            title: article.title,
            slug: article.slug,
            description: article.description,
            content: article.content,
            category: article.category,
            platform: article.platform,
            tags: article.tags,
            author: article.author,
            status: article.status
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this article?')) return;
        try {
            await axios.delete(`${API_URL}/api/articles/${id}`);
            fetchArticles();
        } catch (error) {
            console.error('Failed to delete article:', error);
        }
    };

    // Don't render anything until authentication is verified
    if (isLoading || !isAuthenticated) {
        return null;
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto mb-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">Admin Panel</h1>
                            <p className="text-sm text-slate-600">Logged in as {typeof window !== 'undefined' ? (localStorage.getItem('username') || 'Admin') : 'Admin'}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => router.push('/settings')}
                                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                            >
                                Settings
                            </button>
                            <button
                                onClick={() => {
                                    if (typeof window !== 'undefined') {
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('username');
                                    }
                                    router.push('/login');
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-slate-200">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">
                            {editingId ? 'Edit Article' : 'Create New Article'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2 border"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Slug (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2 border"
                                        placeholder="custom-url-path"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Author</label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2 border"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Platform</label>
                                    <input
                                        type="text"
                                        list="platforms"
                                        value={formData.platform}
                                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2 border"
                                        placeholder="Select or type..."
                                    />
                                    <datalist id="platforms">
                                        <option value="MacOS" />
                                        <option value="iOS" />
                                        <option value="Windows" />
                                        <option value="Android" />
                                    </datalist>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2 border"
                                    placeholder="e.g. #tutorial, #setup"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={10}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2 border font-mono"
                                    required
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors"
                                >
                                    {editingId ? 'Update Article' : 'Create Article'}
                                </button>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingId(null);
                                            setFormData({
                                                title: '',
                                                slug: '',
                                                description: '',
                                                content: '',
                                                category: 'General',
                                                platform: '',
                                                tags: '',
                                                author: 'Admin',
                                                status: 'Published'
                                            });
                                        }}
                                        className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">Article List</h2>
                        <div className="space-y-4">
                            {articles.map((article) => (
                                <div key={article.id} className="border p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-slate-900">{article.title}</h3>
                                            <div className="flex gap-2 text-xs text-slate-500 mt-1">
                                                <span>/{article.slug}</span>
                                                {article.platform && <span className="px-1.5 py-0.5 bg-slate-100 rounded">{article.platform}</span>}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(article)}
                                                className="text-sky-600 hover:text-sky-800 text-sm font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(article.id!)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
