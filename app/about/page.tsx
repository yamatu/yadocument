'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="h-48 bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                        <h1 className="text-4xl font-bold text-white">关于我们</h1>
                    </div>

                    <div className="p-8 sm:p-12">
                        <div className="prose prose-lg prose-slate max-w-none">
                            <p className="lead">
                                文档Blog 是一个专注于技术分享、教程编写和知识沉淀的平台。
                            </p>

                            <h3>我们的使命</h3>
                            <p>
                                在技术快速迭代的今天，我们致力于为开发者和技术爱好者提供清晰、准确、易懂的技术文档和解决方案。无论是环境配置、软件安装，还是开发技巧，我们都希望能够帮助你节省时间，少走弯路。
                            </p>

                            <h3>内容涵盖</h3>
                            <ul>
                                <li><strong>MacOS / Windows / Android</strong> 平台软件安装与配置</li>
                                <li><strong>开发环境搭建</strong> (Go, Python, Node.js, etc.)</li>
                                <li><strong>效率工具推荐</strong> 与使用技巧</li>
                                <li><strong>网络与安全</strong> 相关知识</li>
                            </ul>

                            <h3>联系我们</h3>
                            <p>
                                如果您有任何问题、建议或合作意向，欢迎通过以下方式联系我们：
                            </p>
                            <ul>
                                <li>Email: contact@techdocs.com</li>
                                <li>GitHub: github.com/techdocs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
