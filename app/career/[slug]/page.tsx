import { Metadata } from "next";
import { notFound } from "next/navigation";
import careers from "../../../data/careers.json";
import agents from "../../../data/agents.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const career = careers.find((c) => c.slug === slug);
  if (!career) return {};
  return {
    title: `${career.title}【2026年版】| フリーエンジニアHub`,
    description: career.description,
  };
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const career = careers.find((c) => c.slug === slug);
  if (!career) notFound();

  const recommendedAgentData = career.recommendedAgents
    .map((agentSlug) => agents.find((a) => a.slug === agentSlug))
    .filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: career.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <Breadcrumb
        items={[
          { label: "キャリア・案件獲得ガイド", href: "/career/first-project/" },
          { label: career.title },
        ]}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-14 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block px-3 py-1 bg-secondary/20 text-purple-300 text-sm font-medium rounded-full border border-secondary/30 mb-5">
              キャリア・案件獲得ガイド
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{career.title}</h1>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {career.description}
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Sections */}
          <section className="mb-14">
            <h2 className="text-xl font-bold text-text-primary mb-8">
              詳細ガイド（全{career.sections.length}セクション）
            </h2>
            <div className="space-y-6">
              {career.sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-border shadow-sm overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-6 border-b border-border bg-gray-50/50">
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-text-primary text-base">{section.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-text-secondary leading-relaxed">{section.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="mb-14">
            <h2 className="text-xl font-bold text-text-primary mb-6">実践的なポイント</h2>
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <ul className="space-y-3">
                {career.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-primary text-white rounded-full text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Recommended Agents */}
          {recommendedAgentData.length > 0 && (
            <section className="mb-14">
              <h2 className="text-xl font-bold text-text-primary mb-6">
                このガイドで活用したいエージェント
              </h2>
              <p className="text-xs text-text-muted mb-4">※PRを含みます（広告掲載）</p>
              <div className="space-y-4">
                {recommendedAgentData.map((agent) => {
                  if (!agent) return null;
                  return (
                    <div
                      key={agent.id}
                      className="bg-white rounded-xl border border-border p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-text-primary">{agent.name}</h3>
                        <p className="text-xs text-primary font-medium">{agent.tagline}</p>
                        <p className="text-xs text-text-secondary mt-1">
                          平均年収 {agent.avgIncome}万円 / リモート率 {agent.remoteRate}%
                        </p>
                      </div>
                      <a
                        href={agent.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center justify-center px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors text-sm shrink-0"
                      >
                        無料登録する
                      </a>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* FAQ */}
          <section className="mb-12">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <h2 className="text-xl font-bold text-text-primary mb-6">よくある質問</h2>
            <div className="space-y-4">
              {career.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white rounded-xl border border-border shadow-sm"
                >
                  <summary className="px-6 py-4 cursor-pointer font-medium text-text-primary text-sm flex items-center justify-between">
                    {faq.question}
                    <span className="text-primary ml-2 shrink-0">+</span>
                  </summary>
                  <div className="px-6 pb-4 text-sm text-text-secondary leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-center text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">
              フリーランスへの第一歩を踏み出そう
            </h2>
            <p className="text-blue-100 mb-6 text-sm">
              複数のエージェントに無料相談して、
              <br />
              あなたのスキルで狙える案件・単価を把握しましょう。
            </p>
            <a
              href="/#ranking"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              おすすめエージェントを見る
            </a>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
