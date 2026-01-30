import { MetadataRoute } from 'next'
import { SITE_URL } from '../utils/config'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/settings', '/login'],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    }
}
