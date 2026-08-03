import React, { useState } from 'react';
import { 
  Globe, 
  HelpCircle, 
  Share2, 
  Store, 
  History as HistoryIcon, 
  RotateCcw, 
  ThumbsUp, 
  ChevronDown,
  ShoppingBag,
  UtensilsCrossed
} from 'lucide-react';
import { SchemeType, Language, TranslationDictionary } from '../types';

interface HeaderProps {
  currentScheme: SchemeType;
  onSchemeChange: (scheme: SchemeType) => void;
  vouchersLeftAmount: number;
  totalSchemeAllocation: number;
  onOpenShare: () => void;
  onOpenMerchants: () => void;
  onOpenHistory: () => void;
  onOpenHelp: () => void;
  onResetPack: (mode: 'screenshot' | 'full300') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationDictionary;
}

export const Header: React.FC<HeaderProps> = ({
  currentScheme,
  onSchemeChange,
  vouchersLeftAmount,
  totalSchemeAllocation,
  onOpenShare,
  onOpenMerchants,
  onOpenHistory,
  onOpenHelp,
  onResetPack,
  language,
  onLanguageChange,
  t,
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const languageLabels: Record<Language, string> = {
    en: 'English',
    zh: '中文',
    ms: 'Melayu',
    ta: 'தமிழ்',
  };

  return (
    <header className="bg-[#1b2845] text-white select-none relative shadow-md">
      {/* Top Navbar */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* CDC Voucher tilted Logo badge */}
        <div className="flex items-center gap-2">
          <div className="relative inline-flex items-center transform -rotate-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-black px-3 py-1 rounded-sm shadow-sm border border-red-400/30">
            <span className="text-yellow-300 mr-1.5 flex items-center">
              <ThumbsUp className="w-4 h-4 fill-yellow-300 text-yellow-300 transform -rotate-12" />
            </span>
            <span className="text-sm sm:text-base tracking-tight font-extrabold uppercase">
              {t.title}
            </span>
          </div>
          <span className="hidden sm:inline-block text-xs text-blue-200/80 font-medium px-2 py-0.5 bg-white/10 rounded-full">
            Singapore Government • 2026
          </span>
        </div>

        {/* Right tools: Language dropdown, Help button, Merchants, History */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 bg-[#253354] hover:bg-[#2d3e65] text-sm font-medium transition-colors"
              aria-label="Select Language"
            >
              <Globe className="w-4 h-4 text-blue-300" />
              <span>{languageLabels[language]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white text-slate-800 rounded-xl shadow-xl py-1 z-50 border border-slate-200">
                {(['en', 'zh', 'ms', 'ta'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      onLanguageChange(lang);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-sm font-medium flex items-center justify-between hover:bg-slate-100 transition-colors ${
                      language === lang ? 'text-blue-700 bg-blue-50/70 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <span>{languageLabels[lang]}</span>
                    {language === lang && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Help button "?" matching the screenshot square/rounded button */}
          <button
            onClick={onOpenHelp}
            aria-label={t.helpBtn}
            className="w-9 h-9 rounded-lg bg-[#44527d] hover:bg-[#546494] flex items-center justify-center font-bold text-base transition-colors shadow-sm"
            title={t.helpBtn}
          >
            <HelpCircle className="w-5 h-5 text-blue-100" />
          </button>

          {/* Merchants locator button */}
          <button
            onClick={onOpenMerchants}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-medium transition-colors"
            title={t.findMerchants}
          >
            <Store className="w-4 h-4 text-emerald-300" />
            <span>{t.findMerchants}</span>
          </button>

          {/* History / Transactions button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-medium transition-colors"
            title={t.historyBtn}
          >
            <HistoryIcon className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">{t.historyBtn}</span>
          </button>
        </div>
      </div>

      {/* Main Banner section matching the screenshot */}
      <div className="max-w-4xl mx-auto px-4 pt-2 pb-6">
        {/* Scheme Selector Box (The white box in screenshot) */}
        <div className="bg-white rounded-xl p-1.5 mb-5 shadow-lg flex flex-col sm:flex-row gap-1 border border-white/20">
          <button
            onClick={() => onSchemeChange('hawker')}
            className={`flex-1 flex items-center gap-3 px-3.5 py-3 rounded-lg text-left transition-all ${
              currentScheme === 'hawker'
                ? 'bg-[#1b2845] text-white shadow-md ring-2 ring-blue-400'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              currentScheme === 'hawker' ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-700'
            }`}>
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight sm:text-base">
                {t.schemeHawkerTitle}
              </div>
              <div className={`text-xs mt-0.5 line-clamp-1 ${
                currentScheme === 'hawker' ? 'text-blue-200' : 'text-slate-500'
              }`}>
                {t.schemeHawkerSubtitle}
              </div>
            </div>
          </button>

          <button
            onClick={() => onSchemeChange('supermarket')}
            className={`flex-1 flex items-center gap-3 px-3.5 py-3 rounded-lg text-left transition-all ${
              currentScheme === 'supermarket'
                ? 'bg-[#1b2845] text-white shadow-md ring-2 ring-amber-400'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              currentScheme === 'supermarket' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700'
            }`}>
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight sm:text-base">
                {t.schemeSupermarketTitle}
              </div>
              <div className={`text-xs mt-0.5 line-clamp-1 ${
                currentScheme === 'supermarket' ? 'text-amber-200' : 'text-slate-500'
              }`}>
                {t.schemeSupermarketSubtitle}
              </div>
            </div>
          </button>
        </div>

        {/* Balance and Share My Vouchers Row (matching screenshot!) */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs sm:text-sm text-blue-200/90 font-medium uppercase tracking-wide">
              {t.vouchersLeft}
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white font-mono">
                ${vouchersLeftAmount}
              </span>
              <span className="text-xs text-blue-200/70">
                / ${totalSchemeAllocation} total
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Share My Vouchers pill button matching screenshot `#434e7a` */}
            <button
              onClick={onOpenShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#44527d] hover:bg-[#526294] text-white font-medium text-sm sm:text-base shadow-md transition-all transform active:scale-95"
            >
              <Share2 className="w-4 h-4 text-blue-200" />
              <span>{t.shareMyVouchers}</span>
            </button>

            {/* Demo reset menu */}
            <div className="relative">
              <button
                onClick={() => setResetOpen(!resetOpen)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white transition-colors"
                title="Demo Options & Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {resetOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-xl shadow-xl p-2 z-50 border border-slate-200 text-xs">
                  <div className="px-2 py-1 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    Demo Household Presets
                  </div>
                  <button
                    onClick={() => {
                      onResetPack('screenshot');
                      setResetOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-100 font-medium text-slate-700 flex items-center justify-between"
                  >
                    <span>📸 Screenshot state ($72 left)</span>
                  </button>
                  <button
                    onClick={() => {
                      onResetPack('full300');
                      setResetOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-100 font-medium text-slate-700 flex items-center justify-between"
                  >
                    <span>🎁 Full $300 Household Pack</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
