import agents from "../data/agents.json";

export default function Home() {
  const top3 = agents.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">FE</span>
            <span className="text-lg font-bold text-text-primary">
              フリーエンジニアHub
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
            <a href="#ranking" className="hover:text-primary transition-colors">
              ランキング
            </a>
            <a href="#guide" className="hover:text-primary transition-colors">
              単価帯ガイド
            </a>
            <a href="#roadmap" className="hover:text-primary transition-colors">
              独立ロードマップ
            </a>
            <a href="#choose" className="hover:text-primary transition-colors">
              選び方
            </a>
            <a href="#faq" className="hover:text-primary transition-colors">
              FAQ
            </a>
          </nav>
          <a
            href="#ranking"
            className="md:hidden text-sm font-medium text-primary"
          >
            ランキングを見る
          </a>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, #2563EB 0%, transparent 50%), radial-gradient(circle at 75% 75%, #7C3AED 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <p className="text-sm sm:text-base font-medium text-blue-400 mb-4">
            フリーランスエンジニア向けエージェント比較サイト
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            会社員からフリーランスへ。
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              最適なエージェントが見つかる。
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            厳選10社のフリーランスエンジニア向けエージェントを、案件数・単価・マージン率・リモート対応など多角的に比較。
            あなたのスキルとキャリアプランに合った最適なエージェントが見つかります。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#ranking"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors text-base"
            >
              ランキングTOP3を見る
            </a>
            <a
              href="#roadmap"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/30 hover:bg-white/10 text-white font-medium rounded-lg transition-colors text-base"
            >
              独立ロードマップ
            </a>
          </div>
        </div>
      </section>

      {/* ===== Trust Badges ===== */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-primary">
                10社
              </span>
              <span className="text-sm text-text-secondary">
                厳選エージェント比較
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-primary">
                800万円超
              </span>
              <span className="text-sm text-text-secondary">
                平均年収（全エージェント平均）
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-primary">
                多数掲載
              </span>
              <span className="text-sm text-text-secondary">
                リモート対応案件
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Ranking TOP3 ===== */}
      <section id="ranking" className="bg-background py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              2026年最新
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              フリーランスエージェントランキング TOP3
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              案件数・単価・サポート体制を総合的に評価した、おすすめエージェントTOP3をご紹介します。
            </p>
          </div>

          <div className="space-y-8">
            {top3.map((agent, index) => (
              <div
                key={agent.id}
                className="bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  {/* Rank badge + name */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-lg text-white font-bold text-xl shrink-0 ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                            ? "bg-gray-400"
                            : "bg-amber-700"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {agent.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {agent.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="bg-background rounded-lg p-3 text-center">
                      <p className="text-lg sm:text-xl font-bold text-primary">
                        {agent.avgIncome}万円
                      </p>
                      <p className="text-xs text-text-muted">平均年収</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                      <p className="text-lg sm:text-xl font-bold text-primary">
                        {agent.remoteRate}%
                      </p>
                      <p className="text-xs text-text-muted">リモート率</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                      <p className="text-lg sm:text-xl font-bold text-primary">
                        週{agent.minWeekDays}日〜
                      </p>
                      <p className="text-xs text-text-muted">最低稼働日数</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center">
                      <p className="text-lg sm:text-xl font-bold text-success">
                        おすすめ
                      </p>
                      <p className="text-xs text-text-muted">総合評価</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-text-primary mb-2">
                      主な特徴
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.features.map((feature, i) => (
                        <span
                          key={i}
                          className="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full border border-primary/10"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pros / Cons */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-bold text-success mb-2">
                        メリット
                      </h4>
                      <ul className="space-y-1">
                        {agent.pros.map((pro, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-text-secondary"
                          >
                            <span className="text-success shrink-0 mt-0.5">
                              +
                            </span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-warning mb-2">
                        デメリット
                      </h4>
                      <ul className="space-y-1">
                        {agent.cons.map((con, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-text-secondary"
                          >
                            <span className="text-warning shrink-0 mt-0.5">
                              -
                            </span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={agent.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors text-sm"
                  >
                    {agent.name}の公式サイトを見る
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 月単価帯別ガイド ===== */}
      <section id="guide" className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              月単価帯別ガイド
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              あなたのスキルレベルと経験年数に応じた目安単価と、おすすめのエージェントをご紹介します。
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* 〜60万 */}
            <div className="rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-primary rounded-lg font-bold text-lg mb-4">
                60
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                月単価 〜60万円
              </h3>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                経験1〜3年のエンジニア。まずはフリーランスとしての実績を積む段階。案件数が多いエージェントで安定した受注を目指しましょう。
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-text-primary">
                    対象スキル:
                  </span>
                  <p className="text-text-secondary">
                    Java、PHP、JavaScript、HTML/CSS、基本的なAWS
                  </p>
                </div>
                <div>
                  <span className="font-medium text-text-primary">
                    おすすめエージェント:
                  </span>
                  <p className="text-text-secondary">
                    レバテックフリーランス、Midworks（福利厚生で安心）
                  </p>
                </div>
                <div>
                  <span className="font-medium text-text-primary">
                    ポイント:
                  </span>
                  <p className="text-text-secondary">
                    案件数の多いエージェントに複数登録し、途切れなく案件を受けることが重要。SES案件も含め経験を積みましょう。
                  </p>
                </div>
              </div>
            </div>

            {/* 60-80万 */}
            <div className="rounded-xl border-2 border-primary p-6 shadow-md relative">
              <div className="absolute -top-3 left-6">
                <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                  ボリュームゾーン
                </span>
              </div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg font-bold text-lg mb-4">
                80
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                月単価 60〜80万円
              </h3>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                経験3〜7年の中堅エンジニア。専門性を活かした案件選びでキャリアアップ。エンド直案件で単価を上げましょう。
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-text-primary">
                    対象スキル:
                  </span>
                  <p className="text-text-secondary">
                    React/Vue、Go/Python、AWS設計、チームリード経験
                  </p>
                </div>
                <div>
                  <span className="font-medium text-text-primary">
                    おすすめエージェント:
                  </span>
                  <p className="text-text-secondary">
                    レバテック、Findy Freelance（モダン技術）、テクフリ（マージン10%）
                  </p>
                </div>
                <div>
                  <span className="font-medium text-text-primary">
                    ポイント:
                  </span>
                  <p className="text-text-secondary">
                    エンド直案件を狙い、マージンの低いエージェントを選ぶことで手取りが大きく変わります。得意技術の深掘りが鍵。
                  </p>
                </div>
              </div>
            </div>

            {/* 80万超 */}
            <div className="rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-secondary rounded-lg font-bold text-lg mb-4">
                80+
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                月単価 80万円超
              </h3>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                経験7年以上のシニアエンジニア。アーキテクト、テックリード、PM/PMOなど上流工程で高単価を実現。
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-text-primary">
                    対象スキル:
                  </span>
                  <p className="text-text-secondary">
                    システム設計、マイクロサービス、K8s、PM/PMO、テックリード
                  </p>
                </div>
                <div>
                  <span className="font-medium text-text-primary">
                    おすすめエージェント:
                  </span>
                  <p className="text-text-secondary">
                    TechStock（平均935万）、PE-BANK（マージン公開）
                  </p>
                </div>
                <div>
                  <span className="font-medium text-text-primary">
                    ポイント:
                  </span>
                  <p className="text-text-secondary">
                    ハイスキル特化型エージェントに登録。直請け案件やPM/コンサル案件で年収1,000万超も視野に入ります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 独立ロードマップ ===== */}
      <section id="roadmap" className="bg-background py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              会社員からフリーランスへの独立ロードマップ
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              フリーランスエンジニアとして独立するまでの4ステップを解説します。
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-xl border border-border p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full font-bold text-sm">
                  1
                </div>
                <h3 className="font-bold text-text-primary">会社員時代</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                まずは会社員として3年以上の実務経験を積みましょう。実績と人脈が独立後の武器になります。
              </p>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">*</span>
                  得意な技術分野を見つける
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">*</span>
                  プロジェクトリード経験を積む
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">*</span>
                  業界の人脈を広げておく
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl border border-border p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full font-bold text-sm">
                  2
                </div>
                <h3 className="font-bold text-text-primary">準備期間</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                独立の3〜6ヶ月前から準備を開始。資金計画とエージェント選びが成功の鍵です。
              </p>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">*</span>
                  生活費6ヶ月分の貯蓄を確保
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">*</span>
                  エージェント3社以上に面談
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">*</span>
                  開業届・青色申告の準備
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">*</span>
                  クレジットカード・ローンの整理
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl border border-border p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-secondary text-white rounded-full font-bold text-sm">
                  3
                </div>
                <h3 className="font-bold text-text-primary">独立・参画</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                退職後すぐに案件に参画できるよう、在職中に初回案件を確定させましょう。
              </p>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-secondary shrink-0 mt-0.5">*</span>
                  退職1ヶ月前に案件を確定
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary shrink-0 mt-0.5">*</span>
                  開業届を税務署に提出
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary shrink-0 mt-0.5">*</span>
                  国民健康保険・年金の切替
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary shrink-0 mt-0.5">*</span>
                  事業用口座の開設
                </li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl border border-border p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-success text-white rounded-full font-bold text-sm">
                  4
                </div>
                <h3 className="font-bold text-text-primary">安定・拡大</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                独立後6ヶ月を目安に単価交渉やスキルアップで収入を安定・拡大させましょう。
              </p>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-success shrink-0 mt-0.5">*</span>
                  半年後に単価交渉を実施
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success shrink-0 mt-0.5">*</span>
                  複数エージェントで案件比較
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success shrink-0 mt-0.5">*</span>
                  確定申告を確実に実施
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success shrink-0 mt-0.5">*</span>
                  小規模企業共済等で節税対策
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== エージェントの選び方 5つのポイント ===== */}
      <section id="choose" className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              フリーランスエージェントの選び方 5つのポイント
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              後悔しないエージェント選びのために、必ずチェックすべき5つの観点を解説します。
            </p>
          </div>

          <div className="space-y-6">
            {/* Point 1 */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary rounded-lg font-bold text-lg shrink-0">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  マージン率（中間手数料）を確認する
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  エージェントの収益源であるマージン率は、あなたの手取りに直結します。業界平均は20〜30%ですが、テクフリの10%やPE-BANKの8〜12%のように低マージンを掲げるエージェントもあります。マージン率を公開しているエージェントは透明性が高く信頼できます。同じ案件でもエージェントによって手取りが月10万円以上変わることもあるため、必ず比較しましょう。
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary rounded-lg font-bold text-lg shrink-0">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  案件数と案件の質をチェックする
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  案件数が多いほど選択肢が広がりますが、数だけでなく質も重要です。エンド直案件（クライアント直接契約）の比率が高いエージェントは、中間マージンが少なく高単価が期待できます。また、自分の得意技術・希望条件に合う案件があるかを事前に確認しましょう。レバテックフリーランスは20,000件以上、Midworksはエンド直70%と、それぞれ異なる強みがあります。
                </p>
              </div>
            </div>

            {/* Point 3 */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary rounded-lg font-bold text-lg shrink-0">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  サポート体制と福利厚生を比較する
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  フリーランスになると税務処理や契約交渉を自分で行う必要があります。確定申告サポート、契約書レビュー、福利厚生サービスが充実しているエージェントを選ぶことで、本業に集中できます。特にMidworksの正社員並み保障やギークスジョブの「フリノベ」は、フリーランス初心者にとって安心材料になります。
                </p>
              </div>
            </div>

            {/* Point 4 */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary rounded-lg font-bold text-lg shrink-0">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  リモート対応・稼働日数の柔軟性を見る
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  働き方の柔軟性はフリーランスの大きなメリットです。フルリモート案件を重視するならFindy
                  Freelance（80%がリモート対応）、週2〜3日稼働で複業したいならITプロパートナーズがおすすめです。自分の理想の働き方に合ったエージェントを選びましょう。地方在住の方は、リモート率の高いエージェントを優先的に検討してください。
                </p>
              </div>
            </div>

            {/* Point 5 */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary rounded-lg font-bold text-lg shrink-0">
                5
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  複数エージェントに登録して比較する
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  エージェント選びで最も重要なのは、必ず複数社に登録して比較することです。各社が保有する案件は異なり、担当コンサルタントとの相性も重要です。最低3社に登録し、面談で実際に紹介される案件の質や担当者の対応を比較しましょう。登録は無料なので、リスクなく比較検討できます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="bg-background py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              よくある質問
            </h2>
            <p className="text-text-secondary">
              フリーランスエンジニアの独立・エージェント利用に関するよくある質問にお答えします。
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "フリーランスエンジニアの平均年収はどのくらいですか？",
                a: "当サイトで比較しているエージェント10社の平均年収は約830万円です。経験やスキルによって大きく異なり、経験3年程度で600〜700万円、5年以上で800〜900万円、10年以上のシニア層では1,000万円を超えるケースも珍しくありません。会社員時代の1.2〜1.5倍の収入を得ている方が多い傾向です。",
              },
              {
                q: "未経験からフリーランスエンジニアになれますか？",
                a: "技術的には可能ですが、実務経験がないとエージェント経由での案件獲得は難しいのが現実です。一般的には、会社員として最低2〜3年の実務経験を積んでからの独立を推奨します。まずは正社員やSESで経験を積み、得意な技術分野と実績を作ってから独立することで、スムーズに高単価案件を獲得できます。",
              },
              {
                q: "フリーランスエージェントの登録・利用に費用はかかりますか？",
                a: "いいえ、フリーランスエージェントの登録・利用は完全無料です。エージェントはクライアント企業から受け取るマージン（手数料）で運営されているため、エンジニア側に費用は発生しません。複数のエージェントに登録しても一切費用はかからないため、3社以上への登録をおすすめします。",
              },
              {
                q: "フリーランスになると社会保険はどうなりますか？",
                a: "会社員の健康保険・厚生年金から、国民健康保険・国民年金に切り替わります。保険料の負担は増えますが、その分単価が高いため、手取りでは会社員時代を上回ることが多いです。Midworksなど一部のエージェントでは、社会保険に加入できるプランも提供しています。また、小規模企業共済やiDeCoを活用した節税対策で実質的な負担を軽減することも可能です。",
              },
              {
                q: "フリーランスエンジニアに向いているのはどんな人ですか？",
                a: "自己管理能力が高い人、技術的な向上心がある人、変化を楽しめる人が向いています。また、コミュニケーション能力も重要で、クライアントとの折衝や要件定義ができるエンジニアは高単価案件を獲得しやすいです。一方で、安定志向が強い人や、営業・事務処理が苦手な人は、サポートの手厚いエージェント（Midworks、ギークスジョブなど）を活用することで不安を解消できます。",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-border overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-left">
                  <span className="font-medium text-text-primary text-sm sm:text-base">
                    Q. {item.q}
                  </span>
                  <span className="text-text-muted shrink-0 group-open:rotate-180 transition-transform text-lg">
                    &#9662;
                  </span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    A. {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 sm:py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            まずは無料登録から始めましょう
          </h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8 leading-relaxed">
            フリーランスエージェントへの登録は完全無料。まずは3社に登録して案件を比較することが、成功への第一歩です。
          </p>
          <a
            href="#ranking"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-colors text-base"
          >
            おすすめTOP3を見る
          </a>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-dark text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-white">FE</span>
                <span className="text-sm font-bold text-gray-300">
                  フリーエンジニアHub
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                フリーランスエンジニア向けエージェント比較サイト。厳選10社を多角的に比較し、最適なエージェント選びをサポートします。
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-300 mb-3">
                コンテンツ
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#ranking"
                    className="hover:text-white transition-colors"
                  >
                    エージェントランキング
                  </a>
                </li>
                <li>
                  <a
                    href="#guide"
                    className="hover:text-white transition-colors"
                  >
                    月単価帯別ガイド
                  </a>
                </li>
                <li>
                  <a
                    href="#roadmap"
                    className="hover:text-white transition-colors"
                  >
                    独立ロードマップ
                  </a>
                </li>
                <li>
                  <a
                    href="#choose"
                    className="hover:text-white transition-colors"
                  >
                    エージェントの選び方
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-white transition-colors"
                  >
                    よくある質問
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-300 mb-3">
                運営情報
              </h4>
              <ul className="space-y-2 text-xs">
                <li>運営: 株式会社MediaX</li>
                <li>所在地: 東京都渋谷区</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-xs">
              &copy; 2026 フリーエンジニアHub 運営:株式会社MediaX All Rights
              Reserved.
            </p>
            <p className="text-xs mt-2 text-gray-500">
              ※当サイトはアフィリエイトプログラムに参加しています。掲載情報は2026年4月時点のものです。最新情報は各エージェントの公式サイトでご確認ください。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
