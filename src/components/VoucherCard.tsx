import React from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { Voucher } from '../types';

interface VoucherCardProps {
  voucher: Voucher;
  isSelected: boolean;
  onToggleSelect: (voucher: Voucher) => void;
  redeemedBadgeText: string;
}

export const VoucherCard: React.FC<VoucherCardProps> = ({
  voucher,
  isSelected,
  onToggleSelect,
  redeemedBadgeText,
}) => {
  const isRedeemed = voucher.status === 'redeemed';

  const handleClick = () => {
    if (isRedeemed) return;
    onToggleSelect(voucher);
  };

  if (isRedeemed) {
    return (
      <div className="bg-slate-100/80 rounded-2xl border border-slate-200/80 p-4 flex items-center justify-between opacity-60 select-none transition-all">
        {/* Left amount */}
        <div className="flex items-baseline font-mono text-slate-400">
          <span className="text-xl font-bold mr-0.5">$</span>
          <span className="text-4xl font-extrabold tracking-tight">{voucher.amount}</span>
        </div>

        {/* Dashed divider */}
        <div className="h-10 border-r border-dashed border-slate-300 mx-3"></div>

        {/* Right status */}
        <div className="flex flex-col items-end">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200/90 px-2.5 py-0.5 rounded-full">
            {redeemedBadgeText}
          </span>
          {voucher.redeemedAt && (
            <span className="text-[10px] text-slate-400 mt-1 max-w-[130px] truncate">
              {voucher.redeemedAt}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`relative cursor-pointer rounded-2xl p-4 flex items-center justify-between transition-all duration-150 select-none ${
        isSelected
          ? 'bg-[#eff4ff] border-2 border-[#263e75] shadow-md transform scale-[1.01]'
          : 'bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      {/* Left section: Huge $2 / $5 / $10 denomination */}
      <div className="flex items-baseline text-[#223563] font-mono pr-2">
        <span className="text-xl sm:text-2xl font-bold mr-0.5 opacity-80">$</span>
        <span className="text-4xl sm:text-5xl font-black tracking-tight">{voucher.amount}</span>
      </div>

      {/* Dashed vertical separator line matching screenshot */}
      <div className="h-12 border-r border-dashed border-slate-300 my-auto mx-2"></div>

      {/* Right section: Circle selector ring (O) */}
      <div className="flex items-center justify-center pl-2">
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
            isSelected
              ? 'bg-[#213563] text-white shadow-sm ring-4 ring-[#213563]/15'
              : 'border-2 border-slate-400/80 bg-white hover:border-slate-500'
          }`}
        >
          {isSelected && <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />}
        </div>
      </div>
    </div>
  );
};
