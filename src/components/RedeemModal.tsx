import React, { useState, useEffect } from 'react';
import { X, QrCode as QrIcon, ShieldCheck, Clock, CheckCircle, Store, Eye, EyeOff } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { Voucher, Merchant, SchemeType } from '../types';

interface RedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVouchers: Voucher[];
  merchants: Merchant[];
  currentScheme: SchemeType;
  onConfirmRedeem: (merchantName: string) => void;
}

export const RedeemModal: React.FC<RedeemModalProps> = ({
  isOpen,
  onClose,
  selectedVouchers,
  merchants,
  currentScheme,
  onConfirmRedeem,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 mins security timer
  const [showCode, setShowCode] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<string>('');

  const schemeMerchants = merchants.filter((m) => m.scheme === currentScheme);

  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(300);
    if (schemeMerchants.length > 0 && !selectedMerchant) {
      setSelectedMerchant(schemeMerchants[0].name);
    }
  }, [isOpen, currentScheme]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || selectedVouchers.length === 0) return null;

  const totalAmount = selectedVouchers.reduce((s, v) => s + v.amount, 0);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRedeemClick = () => {
    // Fire confetti celebration!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    onConfirmRedeem(selectedMerchant || 'Participating Merchant');
  };

  const qrPayload = JSON.stringify({
    scheme: currentScheme,
    amount: totalAmount,
    count: selectedVouchers.length,
    timestamp: Date.now(),
    codes: selectedVouchers.map((v) => v.code),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header bar matching official RedeemSG */}
        <div className="bg-[#1b2845] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Official Government Voucher
              </div>
              <div className="text-sm font-semibold">
                CDC Vouchers 2026 (Singapore)
              </div>
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

        {/* Modal body */}
        <div className="p-6 text-center">
          {/* Amount display */}
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Voucher Value
          </div>
          <div className="text-5xl font-black text-[#1b2845] font-mono mt-1">
            ${totalAmount.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Combined from {selectedVouchers.length} voucher{selectedVouchers.length > 1 ? 's' : ''}
          </div>

          {/* QR Code Container */}
          <div className="my-6 bg-white p-5 rounded-2xl border-2 border-slate-200 inline-block shadow-inner">
            <QRCodeSVG
              value={qrPayload}
              size={180}
              level="M"
              includeMargin={false}
            />
          </div>

          {/* Security Countdown Timer */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 py-2 px-4 rounded-full max-w-xs mx-auto mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Valid for {formatTime(secondsLeft)}</span>
          </div>

          {/* Optional manual voucher code toggle */}
          <div className="mb-6">
            <button
              onClick={() => setShowCode(!showCode)}
              className="text-xs text-blue-700 hover:text-blue-900 font-semibold inline-flex items-center gap-1 underline"
            >
              {showCode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showCode ? 'Hide Voucher Code' : 'Show Manual Voucher Code'}</span>
            </button>
            {showCode && (
              <div className="mt-2 p-2.5 bg-slate-50 rounded-lg font-mono text-sm font-bold text-slate-800 tracking-widest border border-slate-200">
                {selectedVouchers[0].code}
                {selectedVouchers.length > 1 ? ` (+${selectedVouchers.length - 1} more)` : ''}
              </div>
            )}
          </div>

          {/* Merchant Selector for logging */}
          <div className="text-left mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-slate-500" />
              <span>Redeem at which merchant?</span>
            </label>
            <select
              value={selectedMerchant}
              onChange={(e) => setSelectedMerchant(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {schemeMerchants.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name} ({m.estate})
                </option>
              ))}
              <option value="Other Participating Hawker / Shop">
                Other Participating Hawker / Shop
              </option>
            </select>
          </div>

          {/* Confirm Redemption button */}
          <button
            onClick={handleRedeemClick}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Confirm Payment & Mark as Spent</span>
          </button>
          <p className="text-[11px] text-slate-400 mt-2">
            Click after the merchant scans your QR code or inspects your screen.
          </p>
        </div>
      </div>
    </div>
  );
};
