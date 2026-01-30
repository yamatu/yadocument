import { MetadataRoute } from 'next'
import { SITE_URL, API_URL } from '../utils/config'

// During build, we'll use static URLs only
// At runtime with ISR, it will try to fetch articles
export const dynamic = 'force-static'
export const revalidate = false // Disable revalidation during build

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SITE_URL

    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/categories`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/tags`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/archives`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
    ]

    // Only try to fetch articles at runtime, not during build
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
        // On Vercel or other production environments with running backend
        try {
            const response = await fetch(`${API_URL}/api/articles`, {
                next: { revalidate: 3600 }
            })

            if (response.ok) {
                const articles = await response.json()
                const articleUrls = articles.map((article: any) => ({
                    url: `${baseUrl}/articles/${article.slug}`,
                    lastModified: new Date(article.updated_at || article.created_at),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }))
                return [...staticUrls, ...articleUrls]
            }
        } catch (error) {
            console.warn('Sitemap: Using static URLs only')
        }
    }

    return staticUrls
}
