import { Metadata } from "next";
import { notFound } from "next/navigation";
import markets from "../../../data/markets.json";
import agents from "../../../data/agents.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return markets.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const market = markets.find((m) => m.slug === slug);
  if (!market) return {};
  return {
    title: `${market.title}【2026年最新】| フリーエンジニアHub`,
    description: market.description,
  };
}

export default async function MarketPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const market = markets.find((m) => m.slug === slug);
  if (!market) notFound();

  const recommendedAgentData = market.recommendedAgents
    .map((agentSlug) => agents.find((a) => a.slug === agentSlug))
    .filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: market.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const trendColors: Record<string, string> = {
    "急上昇": "bg-red-100 text-red-700",
    "上昇": "bg-orange-100 text-orange-700",
    "横ばい": "bg-gray-100 text-gray-600",
    "下降": "bg-blue-100 text-blue-600",
    "↑↑": "bg-red-100 text-red-700",
    "↑": "bg-orange-100 text-orange-700",
    "→": "bg-gray-100 text-gray-600",
  };

  const maxValue = Math.max(...market.dataPoints.map((d) => d.value));

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <Breadcrumb
        items={[
          { label: "市場・単価データ", href: "/market/language-ranking/" },
          { label: market.title },
        ]}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm font-medium rounded-full border border-yellow-500/30 mb-5">
              市場・単価データ
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{market.title}</h1>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {market.description}
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          {/* Data Ranking */}
          <section className="mb-14">
            <h2 className="text-xl font-bold text-text-primary mb-6">
              データランキング（全{market.dataPoints.length}項目）
            </h2>
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {market.dataPoints.map((point, i) => {
                  const barWidth = Math.round((point.value / maxValue) * 100);
                  const trendClass = trendColors[point.trend] ?? "bg-gray-100 text-gray-600";
                  return (
                    <div key={i} className="p-4 sm:p-5">
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="inline-flex items-center justify-center w-7 h-7 bg-primary/10 text-primary text-xs font-bold rounded-full shrink-0">
                            {i + 1}
                          </span>
                          <span className="font-medium text-text-primary text-sm">{point.label}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${trendClass}`}>
                            {point.trend}
                          </span>
                          <span className="text-base font-bold text-primary">
                            {point.value.toLocaleString()}
                            <span className="text-xs font-normal text-text-muted ml-1">{point.unit}</span>
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Analysis */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">市場分析・解説</h2>
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <p className="text-sm text-text-secondary leading-relaxed">{market.analysis}</p>
            </div>
          </section>

          {/* Recommended Agents */}
          {recommendedAgentData.length > 0 && (
            <section className="mb-14">
              <h2 className="text-xl font-bold text-text-primary mb-6">
                おすすめエージェント
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
              {market.faqs.map((faq, i) => (
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
              市場データを活かして最適な案件を探そう
            </h2>
            <p className="text-blue-100 mb-6 text-sm">
              複数エージェントに登録して、
              <br />
              あなたのスキルの市場価値を確認しましょう。
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
