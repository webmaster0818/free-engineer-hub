export default function SiteFooter() {
  return (
    <footer className="bg-dark text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">FE</span>
              <span className="text-base font-bold text-white">
                フリーエンジニアHub
              </span>
            </a>
            <p className="text-sm leading-relaxed">
              フリーランスエンジニア向けエージェント比較・独立ガイドサイト。
            </p>
            <p className="text-xs mt-3 text-gray-500">
              当サイトはPRを含みます（広告掲載あり）
            </p>
          </div>

          {/* Agents */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">エージェント詳細</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/agent/levtech-freelance/" className="hover:text-white transition-colors">レバテックフリーランス</a></li>
              <li><a href="/agent/midworks/" className="hover:text-white transition-colors">Midworks</a></li>
              <li><a href="/agent/pe-bank/" className="hover:text-white transition-colors">PE-BANK</a></li>
              <li><a href="/agent/techstock/" className="hover:text-white transition-colors">TechStock</a></li>
              <li><a href="/agent/findy/" className="hover:text-white transition-colors">Findy Freelance</a></li>
              <li><a href="/agent/itpro-partners/" className="hover:text-white transition-colors">ITプロパートナーズ</a></li>
              <li><a href="/agent/foster/" className="hover:text-white transition-colors">フォスター・フリーランス</a></li>
              <li><a href="/agent/geeks-job/" className="hover:text-white transition-colors">Geek Job</a></li>
              <li><a href="/agent/techfree/" className="hover:text-white transition-colors">テクフリ</a></li>
              <li><a href="/agent/coconala-tech/" className="hover:text-white transition-colors">ココナラテック</a></li>
            </ul>
          </div>

          {/* Roadmaps + Skills */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">独立ガイド</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li><a href="/roadmap/complete-guide/" className="hover:text-white transition-colors">独立完全ガイド</a></li>
              <li><a href="/roadmap/preparation/" className="hover:text-white transition-colors">独立前の準備10選</a></li>
              <li><a href="/roadmap/tax-guide/" className="hover:text-white transition-colors">開業届・税金ガイド</a></li>
              <li><a href="/roadmap/income-reality/" className="hover:text-white transition-colors">年収リアル</a></li>
              <li><a href="/roadmap/failure-cases/" className="hover:text-white transition-colors">失敗事例と回避方法</a></li>
            </ul>
            <h3 className="text-sm font-bold text-white mb-4">スキル別案件</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/skill/java/" className="hover:text-white transition-colors">Java案件</a></li>
              <li><a href="/skill/python/" className="hover:text-white transition-colors">Python案件</a></li>
              <li><a href="/skill/react/" className="hover:text-white transition-colors">React/Next.js案件</a></li>
              <li><a href="/skill/go/" className="hover:text-white transition-colors">Go言語案件</a></li>
              <li><a href="/skill/typescript/" className="hover:text-white transition-colors">TypeScript案件</a></li>
              <li><a href="/skill/aws/" className="hover:text-white transition-colors">AWS/クラウド案件</a></li>
              <li><a href="/skill/flutter/" className="hover:text-white transition-colors">Flutter案件</a></li>
              <li><a href="/skill/sap/" className="hover:text-white transition-colors">SAP案件</a></li>
            </ul>
          </div>

          {/* New sections */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">働き方ガイド</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li><a href="/workstyle/week3-week4/" className="hover:text-white transition-colors">週3・週4稼働</a></li>
              <li><a href="/workstyle/full-remote/" className="hover:text-white transition-colors">フルリモート案件</a></li>
              <li><a href="/workstyle/side-job-to-freelance/" className="hover:text-white transition-colors">副業からフリーランスへ</a></li>
              <li><a href="/workstyle/benefits-insurance/" className="hover:text-white transition-colors">福利厚生・保険ガイド</a></li>
              <li><a href="/workstyle/multiple-projects/" className="hover:text-white transition-colors">複数案件の掛け持ち</a></li>
            </ul>
            <h3 className="text-sm font-bold text-white mb-4">お役立ち情報</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li><a href="/useful/tax-return/" className="hover:text-white transition-colors">確定申告ガイド</a></li>
              <li><a href="/useful/invoice-system/" className="hover:text-white transition-colors">インボイス制度対応</a></li>
              <li><a href="/useful/rate-negotiation/" className="hover:text-white transition-colors">単価交渉術</a></li>
              <li><a href="/useful/contract-checklist/" className="hover:text-white transition-colors">契約書チェックポイント</a></li>
              <li><a href="/useful/incorporation/" className="hover:text-white transition-colors">法人化のタイミング</a></li>
            </ul>
            <h3 className="text-sm font-bold text-white mb-4">エージェント比較</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/compare/levtech-vs-midworks/" className="hover:text-white transition-colors">レバテック vs Midworks</a></li>
              <li><a href="/compare/margin-comparison/" className="hover:text-white transition-colors">マージン率比較</a></li>
              <li><a href="/compare/remote-comparison/" className="hover:text-white transition-colors">リモート案件数比較</a></li>
              <li><a href="/compare/benefits-comparison/" className="hover:text-white transition-colors">福利厚生比較</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 フリーエンジニアHub. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <a href="/privacy-policy/" className="hover:text-white transition-colors">プライバシーポリシー</a>
            <a href="/terms/" className="hover:text-white transition-colors">利用規約</a>
            <a href="/contact/" className="hover:text-white transition-colors">お問い合わせ</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
