// Centralized API Configuration
// Priority:
// 1. NEXT_PUBLIC_API_URL environment variable (set in .env.local or CI/CD)
// 2. Default fallback (http://localhost:9000)

export const getApiUrl = () => {
    // In Next.js, process.env.NEXT_PUBLIC_* variables are replaced at build time
    // However, we want to support runtime configuration if possible, or at least consistent build-time config
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Remove trailing slash if present
    if (apiUrl) {
        return apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    }

    // Default fallback
    return 'http://localhost:9000';
};

export const API_URL = getApiUrl();

// Centralized Site URL Configuration
// Priority:
// 1. NEXT_PUBLIC_SITE_URL environment variable (set in .env.local or CI/CD)
// 2. Default fallback (http://localhost:3000)

export const getSiteUrl = () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    // Remove trailing slash if present
    if (siteUrl) {
        return siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
    }

    // Default fallback
    return 'http://localhost:3000';
};

export const SITE_URL = getSiteUrl();
