import { Metadata } from "next";
import { notFound } from "next/navigation";
import roadmaps from "../../../data/roadmaps.json";
import agents from "../../../data/agents.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return roadmaps.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const roadmap = roadmaps.find((r) => r.slug === slug);
  if (!roadmap) return {};
  return {
    title: `${roadmap.title}【2026年版】| フリーエンジニアHub`,
    description: roadmap.description,
  };
}

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const roadmap = roadmaps.find((r) => r.slug === slug);
  if (!roadmap) notFound();

  const recommendedAgentData = roadmap.recommendedAgents
    .map((agentSlug) => agents.find((a) => a.slug === agentSlug))
    .filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: roadmap.faqs.map((faq) => ({
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
          { label: "独立ガイド", href: "/roadmap/complete-guide/" },
          { label: roadmap.title },
        ]}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-14 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block px-3 py-1 bg-secondary/20 text-purple-300 text-sm font-medium rounded-full border border-secondary/30 mb-5">
              独立ロードマップ
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{roadmap.title}</h1>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">{roadmap.description}</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Step-by-step */}
          <section className="mb-14">
            <h2 className="text-xl font-bold text-text-primary mb-8">
              ステップ別ガイド（全{roadmap.steps.length}ステップ）
            </h2>
            <div className="space-y-6">
              {roadmap.steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-border shadow-sm overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-6 border-b border-border-light">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full font-bold text-sm shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-text-primary text-base">{step.title}</h3>
                      {step.duration && (
                        <span className="inline-block text-xs text-text-muted bg-background px-2 py-0.5 rounded-full mt-1">
                          目安: {step.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">{step.description}</p>
                    {step.checkpoints && step.checkpoints.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-text-primary mb-2">チェックリスト</p>
                        <ul className="space-y-1.5">
                          {step.checkpoints.map((cp, ci) => (
                            <li key={ci} className="flex items-start gap-2 text-xs text-text-secondary">
                              <span className="inline-flex items-center justify-center w-4 h-4 border border-border rounded shrink-0 mt-0.5" />
                              {cp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
                {roadmap.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-primary text-white rounded-full text-xs font-bold shrink-0 mt-0.5">
                      !
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Recommended agents */}
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
              {roadmap.faqs.map((faq, i) => (
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
              まずは複数のエージェントに無料相談して、
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
