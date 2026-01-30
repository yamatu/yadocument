'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <nav className="fixed w-full z-50 glass top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="flex items-center gap-3 cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-br from-sky-600 to-cyan-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">description</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-800">文档<span className="text-sky-600">Blog</span></span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
                        <Link href="/" className="text-sky-600 hover:text-sky-700 transition-colors">首页</Link>
                        <Link href="/categories" className="hover:text-slate-900 transition-colors">分类</Link>
                        <Link href="/tags" className="hover:text-slate-900 transition-colors">标签</Link>
                        <Link href="/archives" className="hover:text-slate-900 transition-colors">归档</Link>
                        <Link href="#" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                            AI聊天
                        </Link>
                        <Link href="/about" className="hover:text-slate-900 transition-colors">关于</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block relative">
                            {!isSearchOpen ? (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-md text-xs border border-transparent hover:border-slate-300 transition-all group"
                                >
                                    <span className="material-symbols-outlined text-[16px]">search</span>
                                    <span>搜索文档...</span>
                                    <span className="hidden lg:inline-block ml-2 px-1.5 py-0.5 bg-white rounded border border-slate-200 text-[10px] text-slate-400 group-hover:text-slate-600">⌘K</span>
                                </button>
                            ) : (
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onBlur={() => {
                                            setTimeout(() => setIsSearchOpen(false), 200);
                                        }}
                                        autoFocus
                                        placeholder="搜索文档、标签..."
                                        className="w-64 px-3 py-1.5 pl-8 bg-white border border-sky-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700"
                                    />
                                    <span className="material-symbols-outlined text-[16px] absolute left-2 top-1.5 text-sky-500">search</span>
                                </form>
                            )}
                        </div>
                        <button
                            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <Link href="/admin" className="hidden md:block text-sm text-slate-500 hover:text-slate-900">后台</Link>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-lg">
                    <Link href="/" className="block text-sm font-medium text-slate-600 hover:text-sky-600">首页</Link>
                    <Link href="#" className="block text-sm font-medium text-slate-600 hover:text-sky-600">分类</Link>
                    <Link href="#" className="block text-sm font-medium text-slate-600 hover:text-sky-600">标签</Link>
                    <Link href="/admin" className="block text-sm font-medium text-slate-600 hover:text-sky-600">后台管理</Link>
                </div>
            )}
        </nav>
    );
}
