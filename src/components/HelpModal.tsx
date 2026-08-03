import React, { useState } from 'react';
import { X, HelpCircle, ShieldAlert, CheckCircle2, ChevronDown, ChevronUp, QrCode, Share2, AlertTriangle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How do I use my CDC Vouchers?',
      a: '1) Select either the "Participating Hawkers & Heartland Merchants" or "Participating Supermarkets" tab. 2) Tap the voucher amounts ($2, $5, $10) you want to combine for your bill. 3) Tap "Show voucher ($X)" and let the cashier scan the QR code.',
    },
    {
      q: 'Can I share my CDC Vouchers with my family?',
      a: 'Yes! Tap the "Share My Vouchers" button at the top right of the screen. You can copy the household link or show the family QR code to any household member.',
    },
    {
      q: 'Can I get change if my purchase is less than the voucher amount?',
      a: 'No. Participating merchants and supermarkets do not provide cash change or refunds for unused voucher amounts. We recommend selecting an amount close to or slightly below your total bill.',
    },
    {
      q: 'What is the difference between the two voucher schemes?',
      a: 'Teal/Green vouchers are strictly for Participating Hawkers and Heartland Merchants (coffee shops, hawkers, mini-marts). Yellow/Gold vouchers are strictly for Participating Supermarkets (NTUC FairPrice, Sheng Siong, Cold Storage, Giant, etc.).',
    },
    {
      q: 'How do I protect myself from CDC Voucher scams?',
      a: 'Always check that the URL starts with "voucher.redeem.gov.sg". Government officials will NEVER ask for your SMS link over the phone or via social media. Do not share your link with strangers.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        {/* Header bar */}
        <div className="bg-[#1b2845] text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-300" />
            <div>
              <h3 className="text-base font-bold">Help & Official Guide</h3>
              <p className="text-[11px] text-blue-200">
                Singapore Community Development Council (CDC) Vouchers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 space-y-5 flex-1">
          {/* Quick 3-Step Guide */}
          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3">
              How to Redeem in 3 Easy Steps
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <p className="text-xs text-slate-700 leading-snug">
                  Choose the correct voucher tab (<strong>Hawkers & Merchants</strong> or <strong>Supermarkets</strong>) according to where you are shopping.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <p className="text-xs text-slate-700 leading-snug">
                  Tap individual <strong>$2, $5, or $10</strong> cards to combine up to the amount you need.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <p className="text-xs text-slate-700 leading-snug">
                  Tap <strong>Show voucher</strong> and present the QR code to the cashier to scan.
                </p>
              </div>
            </div>
          </div>

          {/* Scam Prevention Box */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Official Scam Alert & Security</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              • Ensure you are on <strong>voucher.redeem.gov.sg</strong>.<br />
              • Government staff will never ask for your Singpass login or SMS OTP.<br />
              • Do not share screenshots of your QR code online.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Frequently Asked Questions
            </h4>
            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpenIdx = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpenIdx ? null : idx)}
                      className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-2 text-xs font-bold text-slate-800"
                    >
                      <span>{faq.q}</span>
                      {isOpenIdx ? (
                        <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>
                    {isOpenIdx && (
                      <div className="p-3.5 text-xs text-slate-600 bg-white border-t border-slate-200 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 shrink-0">
          For further assistance, visit{' '}
          <a
            href="https://vouchers.cdc.gov.sg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-semibold"
          >
            vouchers.cdc.gov.sg
          </a>
        </div>
      </div>
    </div>
  );
};
