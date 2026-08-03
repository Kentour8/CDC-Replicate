export type SchemeType = 'hawker' | 'supermarket';

export type VoucherStatus = 'available' | 'selected' | 'redeemed';

export interface Voucher {
  id: string;
  scheme: SchemeType;
  amount: 2 | 5 | 10;
  status: VoucherStatus;
  redeemedAt?: string;
  redeemedMerchant?: string;
  code: string;
}

export interface Transaction {
  id: string;
  scheme: SchemeType;
  voucherIds: string[];
  totalAmount: number;
  merchantName: string;
  timestamp: string;
  referenceCode: string;
}

export interface Merchant {
  id: string;
  name: string;
  category: 'Hawker Stall' | 'Heartland Shop' | 'Supermarket' | 'Coffee Shop';
  scheme: SchemeType;
  address: string;
  estate: 'Ang Mo Kio' | 'Bedok' | 'Tampines' | 'Jurong East' | 'Toa Payoh' | 'Clementi' | 'Woodlands';
  unit: string;
  postalCode: string;
  verified: boolean;
}

export type Language = 'en' | 'zh' | 'ms' | 'ta';

export interface TranslationDictionary {
  title: string;
  schemeHawkerTitle: string;
  schemeHawkerSubtitle: string;
  schemeSupermarketTitle: string;
  schemeSupermarketSubtitle: string;
  vouchersLeft: string;
  shareMyVouchers: string;
  selectVouchersTitle: string;
  selectVouchersSubtitle: string;
  showVoucherBtn: string;
  selectedCount: string;
  noVouchersAvailable: string;
  resetDemoBtn: string;
  helpBtn: string;
  findMerchants: string;
  historyBtn: string;
  redeemedBadge: string;
  clearSelection: string;
  quickSelect: string;
  allVouchersSpent: string;
}
