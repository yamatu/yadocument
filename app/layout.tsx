import type { Metadata } from 'next'
import { Inter, Noto_Sans_SC } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoSansSC = Noto_Sans_SC({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-noto-sans-sc' })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: '技术文档中心 | TechDocs Blog',
    template: '%s | TechDocs Blog'
  },
  description: '探索技术前沿，记录成长足迹。提供高质量的技术教程、开发经验和工具推荐。',
  keywords: ['技术博客', '编程教程', '开发文档', 'MacOS', 'Windows', 'iOS', 'Android', '技术分享'],
  authors: [{ name: 'TechDocs Blog' }],
  creator: 'TechDocs Blog',
  publisher: 'TechDocs Blog',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'http://localhost:3000',
    title: '技术文档中心 | TechDocs Blog',
    description: '探索技术前沿，记录成长足迹',
    siteName: 'TechDocs Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: '技术文档中心 | TechDocs Blog',
    description: '探索技术前沿，记录成长足迹',
    creator: '@techdocs',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />
      </head>
      <body className={`${inter.variable} ${notoSansSC.variable} font-sans bg-[#F9FAFB] text-slate-900 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  )
}
