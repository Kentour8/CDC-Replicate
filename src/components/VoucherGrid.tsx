import React, { useState } from 'react';
import { QrCode, CheckSquare, Square, Trash2, Sparkles, Filter } from 'lucide-react';
import { Voucher, TranslationDictionary } from '../types';
import { VoucherCard } from './VoucherCard';

interface VoucherGridProps {
  vouchers: Voucher[];
  selectedVoucherIds: string[];
  onToggleVoucher: (voucher: Voucher) => void;
  onSelectAmount: (targetAmount: number) => void;
  onClearSelection: () => void;
  onShowQrCodeModal: () => void;
  t: TranslationDictionary;
}

export const VoucherGrid: React.FC<VoucherGridProps> = ({
  vouchers,
  selectedVoucherIds,
  onToggleVoucher,
  onSelectAmount,
  onClearSelection,
  onShowQrCodeModal,
  t,
}) => {
  const [showRedeemed, setShowRedeemed] = useState(false);

  const availableVouchers = vouchers.filter((v) => v.status === 'available');
  const redeemedVouchers = vouchers.filter((v) => v.status === 'redeemed');

  const selectedVouchers = vouchers.filter((v) =>
    selectedVoucherIds.includes(v.id)
  );

  const totalSelectedValue = selectedVouchers.reduce(
    (sum, v) => sum + v.amount,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
      {/* Title & Quick select toolbar */}
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a2846] tracking-tight">
              {t.selectVouchersTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {t.selectVouchersSubtitle}
            </p>
          </div>

          {/* Quick select buttons */}
          {availableVouchers.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {t.quickSelect}
              </span>
              {[2, 4, 6, 10, 15, 20].map((amt) => {
                const totalAvail = availableVouchers.reduce((s, v) => s + v.amount, 0);
                if (amt > totalAvail) return null;
                return (
                  <button
                    key={amt}
                    onClick={() => onSelectAmount(amt)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                      totalSelectedValue === amt
                        ? 'bg-[#1b2845] text-white border-[#1b2845] shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                    }`}
                  >
                    ${amt}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Available Vouchers Grid */}
      {availableVouchers.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {availableVouchers.map((voucher) => (
            <VoucherCard
              key={voucher.id}
              voucher={voucher}
              isSelected={selectedVoucherIds.includes(voucher.id)}
              onToggleSelect={onToggleVoucher}
              redeemedBadgeText={t.redeemedBadge}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <QrCode className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-700">
            {t.noVouchersAvailable}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {t.allVouchersSpent}
          </p>
        </div>
      )}

      {/* Redeemed Vouchers toggleable section */}
      {redeemedVouchers.length > 0 && (
        <div className="mt-10 border-t border-slate-200 pt-6">
          <button
            onClick={() => setShowRedeemed(!showRedeemed)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-700 transition-colors"
          >
            <span>
              {showRedeemed ? '▼' : '▶'} Redeemed Vouchers ({redeemedVouchers.length})
            </span>
          </button>

          {showRedeemed && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
              {redeemedVouchers.map((voucher) => (
                <VoucherCard
                  key={voucher.id}
                  voucher={voucher}
                  isSelected={false}
                  onToggleSelect={() => {}}
                  redeemedBadgeText={t.redeemedBadge}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sticky Bottom Action Bar when vouchers are selected */}
      {selectedVoucherIds.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] py-4 px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Summary */}
            <div className="flex items-center gap-3">
              <div className="bg-[#1b2845] text-white font-mono font-bold text-lg px-3 py-1 rounded-xl">
                ${totalSelectedValue}
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">
                  {selectedVoucherIds.length} {t.selectedCount}
                </div>
                <button
                  onClick={onClearSelection}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
                >
                  {t.clearSelection}
                </button>
              </div>
            </div>

            {/* Right: Show voucher button */}
            <button
              onClick={onShowQrCodeModal}
              className="flex items-center gap-2.5 bg-[#1e2f54] hover:bg-[#283e70] text-white font-bold text-base sm:text-lg px-6 py-3 rounded-xl shadow-lg transition-all transform active:scale-95"
            >
              <QrCode className="w-5 h-5 text-yellow-300" />
              <span>{t.showVoucherBtn} (${totalSelectedValue})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
