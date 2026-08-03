import React, { useState, useMemo } from 'react';
import { 
  SchemeType, 
  Voucher, 
  Language, 
  Transaction, 
  Merchant 
} from './types';
import { 
  getInitialVouchers, 
  INITIAL_TRANSACTIONS, 
  SINGAPORE_MERCHANTS, 
  TRANSLATIONS 
} from './data/mockData';
import { Header } from './components/Header';
import { VoucherGrid } from './components/VoucherGrid';
import { RedeemModal } from './components/RedeemModal';
import { ShareModal } from './components/ShareModal';
import { MerchantModal } from './components/MerchantModal';
import { HistoryModal } from './components/HistoryModal';
import { HelpModal } from './components/HelpModal';

export default function App() {
  // State initialization
  const [vouchers, setVouchers] = useState<Voucher[]>(() => getInitialVouchers());
  const [currentScheme, setCurrentScheme] = useState<SchemeType>('hawker');
  const [selectedVoucherIds, setSelectedVoucherIds] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [language, setLanguage] = useState<Language>('en');

  // Modal states
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isMerchantsOpen, setIsMerchantsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const t = TRANSLATIONS[language];

  // Filter vouchers belonging to active scheme
  const schemeVouchers = useMemo(
    () => vouchers.filter((v) => v.scheme === currentScheme),
    [vouchers, currentScheme]
  );

  // Calculate available balance left for active scheme
  const vouchersLeftAmount = useMemo(
    () =>
      schemeVouchers
        .filter((v) => v.status === 'available')
        .reduce((sum, v) => sum + v.amount, 0),
    [schemeVouchers]
  );

  // Total scheme allocation (150 for each scheme, total $300 household pack)
  const totalSchemeAllocation = 150;

  // Handler for scheme tab switch
  const handleSchemeChange = (scheme: SchemeType) => {
    if (scheme !== currentScheme) {
      setCurrentScheme(scheme);
      setSelectedVoucherIds([]); // clear selection when switching schemes
    }
  };

  // Toggle selection of a single voucher card
  const handleToggleVoucher = (voucher: Voucher) => {
    if (voucher.status !== 'available') return;

    setSelectedVoucherIds((prev) => {
      if (prev.includes(voucher.id)) {
        return prev.filter((id) => id !== voucher.id);
      } else {
        return [...prev, voucher.id];
      }
    });
  };

  // Quick select an amount (e.g. $4, $6, $10) using available denominations
  const handleSelectAmount = (targetAmount: number) => {
    const available = schemeVouchers.filter((v) => v.status === 'available');

    // Greedy selection: try larger denominations first if possible, or smaller to hit exact
    // Since we have $2, $5, $10, let's find an exact or closest combination
    let remaining = targetAmount;
    const chosenIds: string[] = [];

    // Sort available vouchers descending
    const sorted = [...available].sort((a, b) => b.amount - a.amount);

    for (const v of sorted) {
      if (v.amount <= remaining) {
        chosenIds.push(v.id);
        remaining -= v.amount;
        if (remaining === 0) break;
      }
    }

    // If we couldn't make exact with descending, let's try ascending ($2+$2+$2...)
    if (remaining > 0) {
      let ascRemaining = targetAmount;
      const ascChosenIds: string[] = [];
      const ascSorted = [...available].sort((a, b) => a.amount - b.amount);
      for (const v of ascSorted) {
        if (v.amount <= ascRemaining) {
          ascChosenIds.push(v.id);
          ascRemaining -= v.amount;
          if (ascRemaining === 0) break;
        }
      }
      if (ascRemaining === 0) {
        setSelectedVoucherIds(ascChosenIds);
        return;
      }
    }

    if (chosenIds.length > 0) {
      setSelectedVoucherIds(chosenIds);
    }
  };

  // Clear current selection
  const handleClearSelection = () => {
    setSelectedVoucherIds([]);
  };

  // Confirm redemption from modal
  const handleConfirmRedeem = (merchantName: string) => {
    const selectedList = vouchers.filter((v) =>
      selectedVoucherIds.includes(v.id)
    );
    const totalAmount = selectedList.reduce((sum, v) => sum + v.amount, 0);

    const nowStr = new Date().toLocaleDateString('en-SG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const refCode = `RD-${Math.floor(1000 + Math.random() * 9000)}-SG`;

    // Mark vouchers as redeemed
    const updatedVouchers = vouchers.map((v) => {
      if (selectedVoucherIds.includes(v.id)) {
        return {
          ...v,
          status: 'redeemed' as const,
          redeemedAt: nowStr,
          redeemedMerchant: merchantName,
        };
      }
      return v;
    });

    const newTx: Transaction = {
      id: `TX-${Math.floor(10000 + Math.random() * 90000)}`,
      scheme: currentScheme,
      voucherIds: selectedVoucherIds,
      totalAmount,
      merchantName,
      timestamp: nowStr,
      referenceCode: refCode,
    };

    setVouchers(updatedVouchers);
    setTransactions([newTx, ...transactions]);
    setSelectedVoucherIds([]);
    setIsRedeemOpen(false);
  };

  // Reset pack options
  const handleResetPack = (mode: 'screenshot' | 'full300') => {
    setSelectedVoucherIds([]);
    if (mode === 'screenshot') {
      // Revert to initial screenshot state ($72 available in hawker scheme)
      setVouchers(getInitialVouchers());
      setCurrentScheme('hawker');
    } else {
      // Generate full $300 pack ($150 hawker + $150 supermarket available)
      const fullVouchers: Voucher[] = [];
      // $150 Hawker: 15 x $2 = 30, 16 x $5 = 80, 4 x $10 = 40 => 150
      for (let i = 1; i <= 15; i++) {
        fullVouchers.push({
          id: `h-full-2-${i}`,
          scheme: 'hawker',
          amount: 2,
          status: 'available',
          code: `CDC-HWK2-2026-F${i}`,
        });
      }
      for (let i = 1; i <= 16; i++) {
        fullVouchers.push({
          id: `h-full-5-${i}`,
          scheme: 'hawker',
          amount: 5,
          status: 'available',
          code: `CDC-HWK5-2026-F${i}`,
        });
      }
      for (let i = 1; i <= 4; i++) {
        fullVouchers.push({
          id: `h-full-10-${i}`,
          scheme: 'hawker',
          amount: 10,
          status: 'available',
          code: `CDC-HWK10-2026-F${i}`,
        });
      }

      // $150 Supermarket: 15 x $2 = 30, 16 x $5 = 80, 4 x $10 = 40 => 150
      for (let i = 1; i <= 15; i++) {
        fullVouchers.push({
          id: `s-full-2-${i}`,
          scheme: 'supermarket',
          amount: 2,
          status: 'available',
          code: `CDC-SUP2-2026-F${i}`,
        });
      }
      for (let i = 1; i <= 16; i++) {
        fullVouchers.push({
          id: `s-full-5-${i}`,
          scheme: 'supermarket',
          amount: 5,
          status: 'available',
          code: `CDC-SUP5-2026-F${i}`,
        });
      }
      for (let i = 1; i <= 4; i++) {
        fullVouchers.push({
          id: `s-full-10-${i}`,
          scheme: 'supermarket',
          amount: 10,
          status: 'available',
          code: `CDC-SUP10-2026-F${i}`,
        });
      }

      setVouchers(fullVouchers);
      setCurrentScheme('hawker');
    }
  };

  const handleSelectMerchant = (merchant: Merchant) => {
    setCurrentScheme(merchant.scheme);
    setSelectedVoucherIds([]);
  };

  const selectedVouchersList = vouchers.filter((v) =>
    selectedVoucherIds.includes(v.id)
  );

  return (
    <div className="min-h-screen bg-[#f1f5fa] text-slate-900 font-sans antialiased">
      {/* Top Header with Logo, scheme switcher, balance ($72), Share button */}
      <Header
        currentScheme={currentScheme}
        onSchemeChange={handleSchemeChange}
        vouchersLeftAmount={vouchersLeftAmount}
        totalSchemeAllocation={totalSchemeAllocation}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenMerchants={() => setIsMerchantsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onResetPack={handleResetPack}
        language={language}
        onLanguageChange={setLanguage}
        t={t}
      />

      {/* Main voucher cards grid matching screenshot */}
      <main>
        <VoucherGrid
          vouchers={schemeVouchers}
          selectedVoucherIds={selectedVoucherIds}
          onToggleVoucher={handleToggleVoucher}
          onSelectAmount={handleSelectAmount}
          onClearSelection={handleClearSelection}
          onShowQrCodeModal={() => setIsRedeemOpen(true)}
          t={t}
        />
      </main>

      {/* Official RedeemSG QR Code Checkout Modal */}
      <RedeemModal
        isOpen={isRedeemOpen}
        onClose={() => setIsRedeemOpen(false)}
        selectedVouchers={selectedVouchersList}
        merchants={SINGAPORE_MERCHANTS}
        currentScheme={currentScheme}
        onConfirmRedeem={handleConfirmRedeem}
      />

      {/* Share My Vouchers Household Link & QR Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      {/* Singapore Merchant Locator Modal */}
      <MerchantModal
        isOpen={isMerchantsOpen}
        onClose={() => setIsMerchantsOpen(false)}
        merchants={SINGAPORE_MERCHANTS}
        onSelectMerchant={handleSelectMerchant}
      />

      {/* Transaction History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        transactions={transactions}
      />

      {/* Help & Scam Alert Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
