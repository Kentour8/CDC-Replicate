import React, { useState } from 'react';
import { X, Copy, Check, Share2, Users, QrCode, ShieldAlert, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  householdId?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  householdId = 'sg-cdc-2026-bedok-4891',
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://voucher.redeem.gov.sg/share/${householdId}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const familyMembers = [
    { name: 'You (Current Device)', device: 'Primary iPhone/Android', vouchersUsed: '$42' },
    { name: 'Mom', device: 'iPhone 15 • Active 2 days ago', vouchersUsed: '$36' },
    { name: 'Dad', device: 'Samsung Galaxy S23 • Active 5 days ago', vouchersUsed: '$20' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header bar */}
        <div className="bg-[#1b2845] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-300" />
            <h3 className="text-base font-bold">Share My Vouchers</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6">
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Share this link with your household members so they can spend from the same CDC Voucher balance.
          </p>

          {/* Share Link box */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2 mb-4">
            <div className="truncate text-xs font-mono text-slate-700 flex-1">
              {shareUrl}
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#1b2845] hover:bg-[#25375e] text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          {/* QR Code for Family */}
          <div className="text-center my-4">
            <div className="inline-block p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <QRCodeSVG value={shareUrl} size={130} level="M" />
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5">
              Family members can scan this QR code to join
            </div>
          </div>

          {/* Household activity log */}
          <div className="border-t border-slate-200 pt-4 mt-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              <Users className="w-4 h-4 text-slate-500" />
              <span>Household Access List</span>
            </div>
            <div className="space-y-2">
              {familyMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-slate-400" />
                    <div>
                      <div className="font-bold text-slate-800">{member.name}</div>
                      <div className="text-[10px] text-slate-500">{member.device}</div>
                    </div>
                  </div>
                  <div className="font-mono font-semibold text-slate-600">
                    Spent: {member.vouchersUsed}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security alert */}
          <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-800 leading-tight">
              <strong>Scam Alert:</strong> Never share your CDC Voucher SMS link with strangers or unverified callers. Government officials will never ask for your link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
