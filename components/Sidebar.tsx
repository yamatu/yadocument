'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Platform {
    platform: string;
    count: number;
}

interface Tag {
    name: string;
    count: number;
}

import { API_URL } from '../utils/config';

export default function Sidebar() {
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [platformsRes, tagsRes] = await Promise.all([
                    axios.get(`${API_URL}/api/platforms`),
                    axios.get(`${API_URL}/api/tags`)
                ]);
                setPlatforms(platformsRes.data || []);
                setTags((tagsRes.data || []).slice(0, 10));
            } catch (error) {
                console.error('Failed to fetch sidebar data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <aside className="w-full lg:w-64 shrink-0">
            <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sky-600 text-[18px]">devices</span>
                        平台
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {platforms.map((platform) => (
                            <Link
                                key={platform.platform}
                                href={`/?platform=${encodeURIComponent(platform.platform)}`}
                                className="px-3 py-1.5 bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 rounded-lg text-xs font-medium transition-all border border-transparent hover:border-sky-200"
                            >
                                {platform.platform}
                                <span className="ml-1.5 text-slate-400">{platform.count}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sky-600 text-[18px]">label</span>
                        热门标签
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Link
                                key={tag.name}
                                href={`/?tag=${encodeURIComponent(tag.name)}`}
                                className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 hover:text-sky-800 rounded-lg text-xs font-medium transition-all"
                            >
                                #{tag.name}
                                <span className="ml-1.5 text-sky-400">{tag.count}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
