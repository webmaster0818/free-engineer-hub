import { Metadata } from "next";
import { notFound } from "next/navigation";
import skills from "../../../data/skills.json";
import agents from "../../../data/agents.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return skills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = skills.find((s) => s.slug === slug);
  if (!skill) return {};
  return {
    title: `${skill.title}【2026年最新】| フリーエンジニアHub`,
    description: skill.description,
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = skills.find((s) => s.slug === slug);
  if (!skill) notFound();

  const recommendedAgentData = skill.recommendedAgents
    .map((agentSlug) => agents.find((a) => a.slug === agentSlug))
    .filter(Boolean);

  const demandColor =
    skill.demandTrend === "急上昇"
      ? "text-red-600 bg-red-50 border-red-200"
      : skill.demandTrend === "安定"
      ? "text-green-600 bg-green-50 border-green-200"
      : "text-blue-600 bg-blue-50 border-blue-200";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: skill.faqs.map((faq) => ({
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
          { label: "スキル別案件", href: "/skill/java/" },
          { label: skill.title },
        ]}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-14 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block px-3 py-1 bg-primary/20 text-blue-300 text-sm font-medium rounded-full border border-primary/30 mb-5">
              スキル別案件ガイド
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{skill.title}</h1>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">{skill.description}</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Market Data */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">市場データ（2026年）</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-border p-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary">{skill.avgMonthlyRate}万円</p>
                <p className="text-xs text-text-muted mt-1">平均月単価</p>
                <p className="text-xs text-text-secondary mt-2 font-medium">
                  レンジ: {skill.avgMonthlyRateRange}万円/月
                </p>
              </div>
              <div className="bg-white rounded-xl border border-border p-6 text-center shadow-sm">
                <span
                  className={`inline-block px-3 py-1 text-sm font-bold rounded-full border ${demandColor}`}
                >
                  {skill.demandTrend}
                </span>
                <p className="text-xs text-text-muted mt-3">需要トレンド</p>
              </div>
              <div className="bg-white rounded-xl border border-border p-6 text-center shadow-sm">
                <p className="text-2xl font-bold text-secondary">{skill.keySkills.length}スキル</p>
                <p className="text-xs text-text-muted mt-1">主要スキル数</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-5 mt-4">
              <p className="text-sm text-text-secondary leading-relaxed">{skill.demandDetail}</p>
            </div>
          </section>

          {/* Key Skills */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">求められる主要スキル</h2>
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {skill.keySkills.map((s, i) => (
                  <span
                    key={i}
                    className="inline-block px-3 py-1.5 bg-primary/5 text-primary text-sm font-medium rounded-lg border border-primary/10"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Career Tips */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">単価アップのキャリア戦略</h2>
            <div className="space-y-3">
              {skill.careerTips.map((tip, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-border p-5 shadow-sm flex items-start gap-4"
                >
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Agents */}
          {recommendedAgentData.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-text-primary mb-6">
                このスキルの案件が多いエージェント
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
              {skill.faqs.map((faq, i) => (
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
              あなたのスキルで案件を探してみよう
            </h2>
            <p className="text-blue-100 mb-6 text-sm">
              複数エージェントに登録して単価相場を確認。
              <br />
              登録・相談は完全無料です。
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
