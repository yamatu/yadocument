import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
    title: '隐私政策 - 文档Blog',
    description: '了解我们如何收集、使用和保护您的个人信息',
};

export default function PrivacyPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">隐私政策</h1>
                        <p className="text-slate-600 mb-8">最后更新：2025年11月25日</p>

                        <div className="prose prose-slate max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. 信息收集</h2>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    我们尊重您的隐私。本网站可能会收集以下类型的信息：
                                </p>
                                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                                    <li>访问日志：包括IP地址、浏览器类型、访问时间等</li>
                                    <li>Cookie信息：用于改善用户体验</li>
                                    <li>订阅信息：如果您选择订阅我们的更新，我们会收集您的邮箱地址</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. 信息使用</h2>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    我们收集的信息将用于：
                                </p>
                                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                                    <li>提供和改进我们的服务</li>
                                    <li>分析网站使用情况</li>
                                    <li>发送您订阅的内容更新（如果适用）</li>
                                    <li>保护网站安全，防止滥用</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. 信息保护</h2>
                                <p className="text-slate-700 leading-relaxed">
                                    我们采取合理的技术和管理措施来保护您的个人信息安全。但请注意，互联网传输不是100%安全的，我们无法保证绝对的安全性。
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Cookie使用</h2>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    本网站使用Cookie来：
                                </p>
                                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                                    <li>记住您的偏好设置</li>
                                    <li>分析网站流量和使用模式</li>
                                    <li>改善网站功能和用户体验</li>
                                </ul>
                                <p className="text-slate-700 leading-relaxed mt-4">
                                    您可以通过浏览器设置管理或禁用Cookie，但这可能会影响某些网站功能。
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. 第三方服务</h2>
                                <p className="text-slate-700 leading-relaxed">
                                    本网站可能包含第三方服务的链接。这些第三方有自己的隐私政策，我们不对其内容或做法负责。
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. 您的权利</h2>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    您有权：
                                </p>
                                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                                    <li>访问我们持有的关于您的个人信息</li>
                                    <li>要求更正不准确的信息</li>
                                    <li>要求删除您的个人信息</li>
                                    <li>随时取消订阅我们的邮件更新</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. 政策更新</h2>
                                <p className="text-slate-700 leading-relaxed">
                                    我们可能会不时更新本隐私政策。任何更改将在此页面上发布，重大更改时我们会通过醒目方式通知您。
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. 联系我们</h2>
                                <p className="text-slate-700 leading-relaxed">
                                    如果您对本隐私政策有任何疑问或建议，请通过网站上的联系方式与我们联系。
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
