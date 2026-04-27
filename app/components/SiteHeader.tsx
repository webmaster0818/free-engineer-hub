"use client";
import { useState } from "react";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">FE</span>
          <span className="text-lg font-bold text-text-primary">
            フリーエンジニアHub
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
          <a href="/#ranking" className="hover:text-primary transition-colors">
            ランキング
          </a>
          <a href="/#guide" className="hover:text-primary transition-colors">
            単価帯ガイド
          </a>
          <a href="/roadmap/complete-guide/" className="hover:text-primary transition-colors">
            独立ガイド
          </a>
          <a href="/skill/java/" className="hover:text-primary transition-colors">
            スキル別案件
          </a>
          <a href="/#faq" className="hover:text-primary transition-colors">
            FAQ
          </a>
        </nav>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-text-primary transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-text-primary transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-text-primary transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* PR disclosure label */}
      <div className="bg-blue-50 border-b border-blue-100 py-1 px-4 text-center">
        <p className="text-xs text-text-muted">
          当サイトはPRを含みます（広告掲載あり）
        </p>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-border shadow-lg">
          <nav className="flex flex-col py-2">
            <a
              href="/#ranking"
              className="px-6 py-3 text-sm font-medium text-text-secondary hover:bg-background hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              ランキング
            </a>
            <a
              href="/#guide"
              className="px-6 py-3 text-sm font-medium text-text-secondary hover:bg-background hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              単価帯ガイド
            </a>
            <a
              href="/roadmap/complete-guide/"
              className="px-6 py-3 text-sm font-medium text-text-secondary hover:bg-background hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              独立ガイド
            </a>
            <a
              href="/skill/java/"
              className="px-6 py-3 text-sm font-medium text-text-secondary hover:bg-background hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              スキル別案件
            </a>
            <a
              href="/#faq"
              className="px-6 py-3 text-sm font-medium text-text-secondary hover:bg-background hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
