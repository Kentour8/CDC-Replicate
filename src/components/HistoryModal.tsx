import React from 'react';
import { X, History as HistoryIcon, Receipt, CheckCircle, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { Transaction } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  transactions,
}) => {
  if (!isOpen) return null;

  const totalSpent = transactions.reduce((sum, tx) => sum + tx.totalAmount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        {/* Header bar */}
        <div className="bg-[#1b2845] text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="text-base font-bold">Voucher Redemption History</h3>
              <p className="text-[11px] text-blue-200">
                Total spent: ${totalSpent.toFixed(2)}
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

        {/* Transactions list */}
        <div className="overflow-y-auto p-4 space-y-3 flex-1">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      tx.scheme === 'hawker'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {tx.scheme === 'hawker' ? (
                      <UtensilsCrossed className="w-5 h-5" />
                    ) : (
                      <ShoppingBag className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-800">
                      {tx.merchantName}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {tx.timestamp}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        Ref: {tx.referenceCode}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" />
                        Redeemed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono font-black text-lg text-[#1b2845]">
                    -${tx.totalAmount}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {tx.voucherIds.length} voucher{tx.voucherIds.length > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Receipt className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No vouchers redeemed yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Spent vouchers will appear here with merchant timestamps
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 shrink-0">
          CDC Voucher Scheme • Singapore Government
        </div>
      </div>
    </div>
  );
};
