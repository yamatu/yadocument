import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
    title: '使用条款 - 文档Blog',
    description: '使用本网站前请仔细阅读这些条款和条件',
};

export default function TermsPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">使用条款</h1>
                        <p className="text-slate-600 mb-8">最后更新：2025年11月25日</p>

                        <div className="prose prose-slate max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. 接受条款</h2>
                                <p className="text-slate-700 leading-relaxed">
                                    欢迎使用文档Blog。通过访问和使用本网站，您同意遵守这些使用条款。如果您不同意这些条款，请不要使用本网站。
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. 使用许可</h2>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    本网站授予您有限的、非独占的、不可转让的许可，允许您：
                                </p>
                                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                                    <li>个人和非商业目的浏览网站内容</li>
                                    <li>下载和打印内容副本供个人使用</li>
                                    <li>在适当注明出处的情况下分享我们的内容</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. 使用限制</h2>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    您同意不会：
                                </p>
                                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                                    <li>未经许可复制、修改、传播或展示网站内容用于商业目的</li>
                                    <li>使用自动化工具（如爬虫、机器人）大量抓取网站内容</li>
                                    <li>试图未经授权访问网站的任何部分或系统</li>
                                    <li>上传或传播恶意代码、病毒或其他有害内容</li>
                                    <li>干扰或破坏网站的正常运行</li>
                                    <li>侵犯他人的知识产权或隐私权</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. 知识产权</h2>
                                <p className="text-slate-700 leading-relaxed">
                                    本网站的所有内容，包括但不限于文本、图像、代码、设计和商标，均受版权和其他知识产权法律保护。除非另有说明，所有权利归文档Blog或其内容提供者所有。
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. 用户生成内容</h2>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    如果您在网站上发布评论或其他内容：
                                </p>
                                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                                    <li>您保证拥有发布该内容的权利</li>
                                    <li>您授予我们使用、修改和展示该内容的非独占性许可</li>
                                    <li>您对自己发布的内容负责</li>
                                    <li>我们保留删除任何不适当内容的权利</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. 免责声明</h2>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    本网站及其内容按"原样"提供，不提供任何形式的保证，包括但不限于：
                                </p>
                                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                                    <li>内容的准确性、完整性或适用性</li>
                                    <li>网站的不间断或无错误运行</li>
                                    <li>使用网站内容所获得的结果</li>
                                </ul>
                                <p className="text-slate-700 leading-relaxed mt-4">
                                    您使用本网站的风险由您自己承担。我们建议您在采取任何行动前，咨询专业人士的意见。
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. 责任限制</h2>
                                <p className="text-slate-700 leading-relaxed">
                                    在法律允许的最大范围内，文档Blog及其运营者不对因使用或无法使用本网站而产生的任何直接、间接、偶然、特殊或后果性损害承担责任。
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. 外部链接</h2>
                                <p className="text-slate-700 leading-relaxed">
                                    本网站可能包含指向第三方网站的链接。这些链接仅为方便用户而提供，我们不对这些外部网站的内容、准确性或可靠性负责。
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. 条款修改</h2>
                                <p className="text-slate-700 leading-relaxed">
                                    我们保留随时修改这些使用条款的权利。修改后的条款将在本页面上发布，并在发布后立即生效。继续使用本网站即表示您接受修改后的条款。
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. 终止</h2>
                                <p className="text-slate-700 leading-relaxed">
                                    我们保留在不事先通知的情况下，随时终止或限制您访问本网站的权利，特别是在您违反这些使用条款的情况下。
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. 联系方式</h2>
                                <p className="text-slate-700 leading-relaxed">
                                    如果您对这些使用条款有任何疑问，请通过网站上提供的联系方式与我们联系。
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
