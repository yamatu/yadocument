'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import TableOfContents from '../../../components/TableOfContents';

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  platform: string;
  slug: string;
  views: number;
  status: string;
  created_at: string;
  updated_at: string;
  author: string;
}

import { API_URL } from '../../../utils/config';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const decodedSlug = decodeURIComponent(params.slug);
        const response = await axios.get(`${API_URL}/api/articles/${decodedSlug}`);
        setArticle(response.data);
      } catch (err) {
        console.error('Failed to fetch article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
          <p className="text-gray-600">{error || 'Article not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex gap-8">
          <article className="flex-1 max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="px-8 py-8 border-b border-slate-100 bg-gradient-to-b from-white to-slate-50/50">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-600 font-medium border border-sky-100">
                  {article.platform || article.category}
                </span>
                <span>•</span>
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                  {article.views} views
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                {article.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-sky-400 pl-4 bg-sky-50/30 py-2 rounded-r-lg">
                {article.description}
              </p>

              {/* Author Info */}
              <div className="mt-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                  {article.author ? article.author.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-slate-900">{article.author || 'Admin'}</p>
                  <p className="text-slate-500 text-xs">Technical Writer</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-10">
              <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-a:text-sky-600 prose-img:rounded-xl">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ children }) => {
                      const text = String(children);
                      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');
                      return <h1 id={id}>{children}</h1>;
                    },
                    h2: ({ children }) => {
                      const text = String(children);
                      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');
                      return <h2 id={id}>{children}</h2>;
                    },
                    h3: ({ children }) => {
                      const text = String(children);
                      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');
                      return <h3 id={id}>{children}</h3>;
                    },
                    h4: ({ children }) => {
                      const text = String(children);
                      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');
                      return <h4 id={id}>{children}</h4>;
                    },
                    a: ({ href, children, ...props }) => {
                      const text = String(children);
                      // Check if link is a download link (contains download emoji or keywords)
                      const isDownloadLink = text.includes('📦') ||
                        text.includes('⬇️') ||
                        text.includes('下载') ||
                        text.toLowerCase().includes('download');

                      if (isDownloadLink) {
                        return (
                          <a
                            href={href}
                            {...props}
                            className="inline-flex items-center gap-2 px-6 py-3 my-4 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-500 hover:to-cyan-500 text-slate-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 no-underline"
                          >
                            {children}
                          </a>
                        );
                      }

                      // Regular links
                      return <a href={href} {...props}>{children}</a>;
                    },
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>
            </div>
          </article>

          {/* Table of Contents */}
          <TableOfContents content={article.content} />
        </div>
      </div>
      <Footer />
    </>
  );
}
