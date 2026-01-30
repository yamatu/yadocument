# yadocument (frontend)

这是一个基于 Next.js (App Router) + React + Tailwind CSS 的文档/博客前端项目。

主要功能（页面路由在 `app/`）：

- 首页文章流（支持按分类/平台/标签/关键字筛选）
- 文章详情页 `app/articles/[slug]`
- 分类 / 标签 / 归档页
- 登录 / 管理 / 设置等页面（依赖后端接口）
- 自动生成 `sitemap` 与 `robots`

## 开发环境

依赖：Node.js 18+（建议 18.17+）

```bash
npm install
npm run dev
```

默认启动后访问：

- http://localhost:3000

## 环境变量

复制示例文件并按需修改：

```bash
cp .env.example .env.local
```

常用变量：

- `NEXT_PUBLIC_API_URL`：后端 API 地址（例如 `http://localhost:9000`）
- `NEXT_PUBLIC_SITE_URL`：站点域名（用于 `sitemap` / `robots`）

注意：该仓库不会提交本地 `.env*`（仅保留 `.env.example` 模板）。

## 生产运行

```bash
npm run build
npm run start
```

当前 `start` 脚本固定使用 3001 端口（见 `package.json`）。

如果你使用 PM2：

```bash
pm2 start ecosystem.config.js
```

## 相关目录

- `app/`：页面与路由（Next.js App Router）
- `components/`：通用组件（Navbar/Sidebar/Footer 等）
- `lib/`、`utils/`：API 与工具方法
