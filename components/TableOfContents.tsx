'use client';

import { useEffect, useState, useRef } from 'react';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const headingRegex = /^(#{1,4})\s+(.+)$/gm;
        const extractedHeadings: TocItem[] = [];
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = text
                .toLowerCase()
                .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
                .replace(/^-+|-+$/g, '');

            extractedHeadings.push({ id, text, level });
        }

        setHeadings(extractedHeadings);
    }, [content]);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0px -80% 0px',
                threshold: 1.0,
            }
        );

        const headingElements = document.querySelectorAll('h1, h2, h3, h4');
        headingElements.forEach((elem) => {
            if (observerRef.current) {
                observerRef.current.observe(elem);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [headings]);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.offsetTop - 100;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <div className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sky-600 text-[18px]">list</span>
                        目录
                    </h3>
                    <nav className="space-y-1">
                        {headings.map((heading, index) => {
                            const isActive = activeId === heading.id;
                            const paddingLeft = (heading.level - 1) * 12;

                            return (
                                <button
                                    key={`${heading.id}-${index}`}
                                    onClick={() => handleClick(heading.id)}
                                    className={`
                    block w-full text-left text-xs py-1.5 px-2 rounded transition-all duration-200
                    ${isActive
                                            ? 'text-sky-600 bg-sky-50 font-medium border-l-2 border-sky-600'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-l-2 border-transparent'
                                        }
                  `}
                                    style={{ paddingLeft: `${paddingLeft + 8}px` }}
                                >
                                    <span className="line-clamp-2">{heading.text}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
}
