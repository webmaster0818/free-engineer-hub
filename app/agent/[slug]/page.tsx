import { Metadata } from "next";
import { notFound } from "next/navigation";
import agents from "../../../data/agents.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) return {};
  return {
    title: `${agent.name}の評判・口コミ・特徴【2026年最新】| フリーエンジニアHub`,
    description: `${agent.name}の特徴・メリット・デメリット・平均年収・リモート率を詳しく解説。フリーランスエンジニアの案件獲得に役立つ情報を網羅。`,
  };
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) notFound();

  const rank = agents.findIndex((a) => a.slug === slug) + 1;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${agent.name}の平均年収は？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${agent.name}の登録エンジニアの平均年収は${agent.avgIncome}万円です。`,
        },
      },
      {
        "@type": "Question",
        name: `${agent.name}はリモート案件が多い？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${agent.name}のリモート対応案件率は${agent.remoteRate}%です。`,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <Breadcrumb
        items={[
          { label: "エージェント一覧", href: "/#ranking" },
          { label: agent.name },
        ]}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-14 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-primary/20 text-blue-300 text-sm font-medium rounded-full border border-primary/30">
                PRを含みます
              </span>
              <span className="text-sm text-gray-400">
                総合ランキング {rank}位
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{agent.name}</h1>
            <p className="text-lg text-blue-300 font-medium mb-4">{agent.tagline}</p>
            <p className="text-gray-300 leading-relaxed max-w-2xl">{agent.description}</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Key Stats */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">基本データ</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-border p-5 text-center shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-primary">{agent.avgIncome}万円</p>
                <p className="text-xs text-text-muted mt-1">平均年収</p>
              </div>
              <div className="bg-white rounded-xl border border-border p-5 text-center shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-primary">{agent.remoteRate}%</p>
                <p className="text-xs text-text-muted mt-1">リモート対応率</p>
              </div>
              <div className="bg-white rounded-xl border border-border p-5 text-center shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-primary">週{agent.minWeekDays}日〜</p>
                <p className="text-xs text-text-muted mt-1">最低稼働日数</p>
              </div>
              <div className="bg-white rounded-xl border border-border p-5 text-center shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-success">
                  {rank <= 3 ? "おすすめ" : "評価良好"}
                </p>
                <p className="text-xs text-text-muted mt-1">総合評価</p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">{agent.name}の主な特徴</h2>
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
              <ul className="space-y-3">
                {agent.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-primary text-white rounded-full text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Pros / Cons */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">メリット・デメリット</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl border border-green-200 p-6">
                <h3 className="text-base font-bold text-success mb-4">メリット</h3>
                <ul className="space-y-3">
                  {agent.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-success font-bold shrink-0">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
                <h3 className="text-base font-bold text-warning mb-4">デメリット</h3>
                <ul className="space-y-3">
                  {agent.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-warning font-bold shrink-0">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Who is recommended for */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-6">{agent.name}はこんな人におすすめ</h2>
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
              <ul className="space-y-3">
                {rank === 1 && (
                  <>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-primary shrink-0 mt-0.5">◆</span>
                      とにかく案件数を重視して早く案件を確定させたい方
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-primary shrink-0 mt-0.5">◆</span>
                      大手企業の直請け案件で実績を積みたい方
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-primary shrink-0 mt-0.5">◆</span>
                      税務・契約などサポートを手厚く受けたい方
                    </li>
                  </>
                )}
                {rank === 2 && (
                  <>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-primary shrink-0 mt-0.5">◆</span>
                      福利厚生・安定性を重視してフリーランスになりたい方
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-primary shrink-0 mt-0.5">◆</span>
                      フリーランス初心者でサポートが必要な方
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-primary shrink-0 mt-0.5">◆</span>
                      案件途切れ時の保障が欲しい方
                    </li>
                  </>
                )}
                {rank !== 1 && rank !== 2 && (
                  <>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-primary shrink-0 mt-0.5">◆</span>
                      {agent.tagline}を活かしたい方
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-primary shrink-0 mt-0.5">◆</span>
                      複数エージェントに登録して案件の選択肢を広げたい方
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-primary shrink-0 mt-0.5">◆</span>
                      高単価案件・リモート案件を重視する方
                    </li>
                  </>
                )}
              </ul>
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
              {[
                {
                  q: `${agent.name}の平均年収は？`,
                  a: `${agent.name}の登録エンジニアの平均年収は${agent.avgIncome}万円です。案件の種類・スキル・経験年数によって大きく変わりますが、スキルの高いエンジニアは年収1,000万円超えも可能です。`,
                },
                {
                  q: `${agent.name}はリモート案件が多い？`,
                  a: `${agent.name}のリモート対応案件率は${agent.remoteRate}%です。フルリモートからハイブリッドまで様々な働き方に対応した案件があります。`,
                },
                {
                  q: `${agent.name}の登録方法は？`,
                  a: `公式サイトから無料で登録できます。登録後は担当コンサルタントとの面談（オンライン可）を経て、希望に合った案件を紹介してもらえます。`,
                },
                {
                  q: `${agent.name}に向いているエンジニアは？`,
                  a: `${agent.features[0]}を求めるエンジニアに特に向いています。IT経験3年以上を目安に、多様なスキルセットに対応した案件を紹介しています。`,
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="bg-white rounded-xl border border-border shadow-sm"
                >
                  <summary className="px-6 py-4 cursor-pointer font-medium text-text-primary text-sm flex items-center justify-between">
                    {faq.q}
                    <span className="text-primary ml-2 shrink-0">+</span>
                  </summary>
                  <div className="px-6 pb-4 text-sm text-text-secondary leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-center text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">
              {agent.name}に無料相談する
            </h2>
            <p className="text-blue-100 mb-6 text-sm leading-relaxed">
              登録・相談は完全無料。在職中でも相談OK。
              <br />
              希望条件を伝えるだけで最適な案件を紹介してもらえます。
            </p>
            <a
              href={agent.officialUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              {agent.name}の公式サイトを見る（無料）
            </a>
            <p className="text-xs text-blue-200 mt-3">※広告・PRを含みます</p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
