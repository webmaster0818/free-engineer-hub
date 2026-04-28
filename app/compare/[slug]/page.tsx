import { Metadata } from "next";
import { notFound } from "next/navigation";
import compares from "../../../data/compares.json";
import agents from "../../../data/agents.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return compares.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const compare = compares.find((c) => c.slug === slug);
  if (!compare) return {};
  return {
    title: `${compare.title}【2026年最新】| フリーエンジニアHub`,
    description: compare.description,
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const compare = compares.find((c) => c.slug === slug);
  if (!compare) notFound();

  const featuredAgentData = compare.agents
    .map((agentSlug) => agents.find((a) => a.slug === agentSlug))
    .filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: compare.faqs.map((faq) => ({
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
          { label: "エージェント比較", href: "/compare/levtech-vs-midworks/" },
          { label: compare.title },
        ]}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm font-medium rounded-full border border-yellow-500/30 mb-5">
              エージェント比較
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{compare.title}</h1>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">{compare.description}</p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          {/* Featured Agents */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">比較対象エージェント</h2>
            <p className="text-xs text-text-muted mb-4">※PRを含みます（広告掲載）</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredAgentData.map((agent) => {
                if (!agent) return null;
                return (
                  <div
                    key={agent.id}
                    className="bg-white rounded-xl border border-border p-5 shadow-sm"
                  >
                    <h3 className="font-bold text-text-primary mb-1">{agent.name}</h3>
                    <p className="text-xs text-primary font-medium mb-3">{agent.tagline}</p>
                    <div className="space-y-1 text-xs text-text-secondary mb-4">
                      <p>平均年収: <span className="font-medium text-text-primary">{agent.avgIncome}万円</span></p>
                      <p>リモート率: <span className="font-medium text-text-primary">{agent.remoteRate}%</span></p>
                      <p>最低稼働: <span className="font-medium text-text-primary">週{agent.minWeekDays}日〜</span></p>
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

          {/* Comparison Table */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">比較表</h2>
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary/5 border-b border-border">
                      <th className="px-4 py-3 text-left font-bold text-text-primary w-32">比較項目</th>
                      {Object.keys(compare.comparisonTable[0])
                        .filter((k) => k !== "category")
                        .map((key) => (
                          <th key={key} className="px-4 py-3 text-left font-bold text-text-primary">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compare.comparisonTable.map((row, i) => (
                      <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <td className="px-4 py-3 font-medium text-text-primary text-xs">{row.category}</td>
                        {Object.entries(row)
                          .filter(([k]) => k !== "category")
                          .map(([k, v]) => (
                            <td key={k} className="px-4 py-3 text-text-secondary text-xs">{v as string}</td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Winner by Category */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">カテゴリ別おすすめ</h2>
            <div className="space-y-3">
              {compare.winnerByCategory.map((item, i) => {
                const winnerAgent = agents.find((a) => a.slug === item.winner);
                return (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-border p-5 shadow-sm flex items-start gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-text-muted bg-gray-100 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-primary mb-1">
                        {winnerAgent?.name ?? item.winner}
                      </p>
                      <p className="text-xs text-text-secondary">{item.reason}</p>
                    </div>
                    <div className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full shrink-0">
                      おすすめ
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recommendation */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">総合おすすめ</h2>
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <p className="text-sm text-text-secondary leading-relaxed">{compare.recommendation}</p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <h2 className="text-xl font-bold text-text-primary mb-6">よくある質問</h2>
            <div className="space-y-4">
              {compare.faqs.map((faq, i) => (
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
              複数エージェントに登録して比較しよう
            </h2>
            <p className="text-blue-100 mb-6 text-sm">
              登録は無料。案件・単価・サポートを実際に比べて最適なエージェントを選ぼう。
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
