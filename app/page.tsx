'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  platform: string;
  author: string;
  author_avatar: string;
  created_at: string;
  slug: string;
  tags: string;
  views: number;
}

import { API_URL } from '../utils/config';

function HomeContent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const platform = searchParams.get('platform');
  const query = searchParams.get('q');
  const tag = searchParams.get('tag');

  const limit = 6;

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    fetchArticles(1, true);
  }, [category, platform, query, tag]);

  const fetchArticles = async (pageNum: number, isReset: boolean) => {
    setLoading(true);
    try {
      const params: any = {
        page: pageNum,
        limit: limit,
      };
      if (category) params.category = category;
      if (platform) params.platform = platform;
      if (query) params.q = query;
      if (tag) params.tag = tag;

      const response = await axios.get(`${API_URL}/api/articles`, { params });
      const newArticles = response.data || [];

      if (newArticles.length < limit) {
        setHasMore(false);
      }

      if (isReset) {
        setArticles(newArticles);
      } else {
        setArticles(prev => [...prev, ...newArticles]);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(nextPage, false);
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-600">article</span>
                {category || platform || (tag ? `#${tag}` : '最新文章')}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>排序:</span>
                <select className="bg-transparent border-none font-medium text-slate-700 focus:ring-0 cursor-pointer">
                  <option>最新发布</option>
                  <option>最多阅读</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <article key={article.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${article.platform === 'MacOS' ? 'bg-slate-100 text-slate-700' : article.platform === 'Windows' ? 'bg-blue-50 text-blue-700' : 'bg-sky-50 text-sky-700'}`}>
                        {article.platform || article.category}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-400">{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
                      <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">{article.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                          {article.author ? article.author[0].toUpperCase() : 'A'}
                        </div>
                        <span className="text-xs font-medium text-slate-600">{article.author || 'Admin'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-xs">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                          {article.views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">favorite</span>
                          0
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {loading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
              </div>
            )}
            {!loading && hasMore && (
              <div className="mt-12 text-center">
                <button onClick={handleLoadMore} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 hover:text-sky-600 hover:border-sky-200 transition-all">
                  加载更多文章
                </button>
              </div>
            )}
            {!loading && articles.length === 0 && (
              <div className="text-center py-12 text-slate-500">暂无相关文章</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
