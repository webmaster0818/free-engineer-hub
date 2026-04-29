import { Metadata } from "next";
import { notFound } from "next/navigation";
import regions from "../../../data/regions.json";
import agents from "../../../data/agents.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = regions.find((r) => r.slug === slug);
  if (!region) return {};
  return {
    title: `${region.title}【2026年版】| フリーエンジニアHub`,
    description: region.description,
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = regions.find((r) => r.slug === slug);
  if (!region) notFound();

  const recommendedAgentData = region.recommendedAgents
    .map((agentSlug) => agents.find((a) => a.slug === agentSlug))
    .filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: region.faqs.map((faq) => ({
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
          { label: "地域別案件情報", href: "/region/tokyo/" },
          { label: region.title },
        ]}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-sm font-medium rounded-full border border-green-500/30 mb-5">
              地域別案件情報
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{region.title}</h1>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {region.description}
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          {/* Stats */}
          <section className="mb-12">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center">
                <p className="text-xs text-text-muted mb-2">案件数（目安）</p>
                <p className="text-3xl font-bold text-primary">
                  {region.jobCount.toLocaleString()}
                  <span className="text-base font-normal text-text-secondary ml-1">件以上</span>
                </p>
              </div>
              <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center">
                <p className="text-xs text-text-muted mb-2">平均月単価</p>
                <p className="text-3xl font-bold text-secondary">
                  {region.avgRate}
                  <span className="text-base font-normal text-text-secondary ml-1">万円</span>
                </p>
              </div>
              <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center">
                <p className="text-xs text-text-muted mb-2">主要クライアント</p>
                <p className="text-sm font-medium text-text-primary">
                  {region.majorClients[0]}
                  <span className="text-text-muted">ほか</span>
                </p>
              </div>
            </div>
          </section>

          {/* Major Clients */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">主要クライアント業種</h2>
            <div className="flex flex-wrap gap-3">
              {region.majorClients.map((client, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-text-secondary shadow-sm"
                >
                  {client}
                </span>
              ))}
            </div>
          </section>

          {/* Characteristics */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">エリアの特徴</h2>
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <p className="text-sm text-text-secondary leading-relaxed">{region.characteristics}</p>
            </div>
          </section>

          {/* Recommended Agents */}
          {recommendedAgentData.length > 0 && (
            <section className="mb-14">
              <h2 className="text-xl font-bold text-text-primary mb-6">
                このエリアでおすすめのエージェント
              </h2>
              <p className="text-xs text-text-muted mb-4">※PRを含みます（広告掲載）</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {recommendedAgentData.map((agent) => {
                  if (!agent) return null;
                  return (
                    <div
                      key={agent.id}
                      className="bg-white rounded-xl border border-border p-5 shadow-sm"
                    >
                      <h3 className="font-bold text-text-primary mb-1">{agent.name}</h3>
                      <p className="text-xs text-primary font-medium mb-3">{agent.tagline}</p>
                      <div className="space-y-1 text-xs text-text-secondary mb-4">
                        <p>
                          平均年収:{" "}
                          <span className="font-medium text-text-primary">{agent.avgIncome}万円</span>
                        </p>
                        <p>
                          リモート率:{" "}
                          <span className="font-medium text-text-primary">{agent.remoteRate}%</span>
                        </p>
                        <p>
                          最低稼働:{" "}
                          <span className="font-medium text-text-primary">週{agent.minWeekDays}日〜</span>
                        </p>
                      </div>
                      <a
                        href={agent.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="block text-center px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors text-xs"
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
              {region.faqs.map((faq, i) => (
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
              地域に合わせた案件を探そう
            </h2>
            <p className="text-blue-100 mb-6 text-sm">
              複数のエージェントに登録して、
              <br />
              あなたのエリアに最適な案件・単価を比較しましょう。
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
