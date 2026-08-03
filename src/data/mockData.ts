import { Voucher, Merchant, TranslationDictionary, Language, Transaction } from '../types';

/**
 * Generates an authentic Singapore CDC Voucher allocation.
 * For the 'hawker' scheme, we initialize with $72 available (like the screenshot!)
 * plus some previously spent vouchers so history is populated.
 */
export const getInitialVouchers = (): Voucher[] => {
  const vouchers: Voucher[] = [];

  // Scheme 1: Hawkers & Heartland Merchants ($72 available matching user's screenshot)
  // Let's create:
  // - 10 x $2 vouchers (6 available = $12, 4 already redeemed = $8)
  // - 16 x $5 vouchers (12 available = $60, 4 already redeemed = $20)
  // - 2 x $10 vouchers (0 available, 2 already redeemed = $20)
  // Total original: $120 spent + $72 available = $192 (or typical CDC batch)
  
  // 6 available $2 vouchers
  for (let i = 1; i <= 6; i++) {
    vouchers.push({
      id: `h-avail-2-${i}`,
      scheme: 'hawker',
      amount: 2,
      status: 'available',
      code: `CDC-HWK2-2026-${100 + i}`,
    });
  }

  // 12 available $5 vouchers
  for (let i = 1; i <= 12; i++) {
    vouchers.push({
      id: `h-avail-5-${i}`,
      scheme: 'hawker',
      amount: 5,
      status: 'available',
      code: `CDC-HWK5-2026-${200 + i}`,
    });
  }

  // Some previously redeemed hawker vouchers for realistic history
  for (let i = 1; i <= 4; i++) {
    vouchers.push({
      id: `h-spent-2-${i}`,
      scheme: 'hawker',
      amount: 2,
      status: 'redeemed',
      code: `CDC-HWK2-2026-${300 + i}`,
      redeemedAt: '2 Aug 2026, 12:45 PM',
      redeemedMerchant: 'Ah Seng Hainanese Chicken Rice (#01-42)',
    });
  }

  for (let i = 1; i <= 4; i++) {
    vouchers.push({
      id: `h-spent-5-${i}`,
      scheme: 'hawker',
      amount: 5,
      status: 'redeemed',
      code: `CDC-HWK5-2026-${400 + i}`,
      redeemedAt: '1 Aug 2026, 06:15 PM',
      redeemedMerchant: 'Old Airport Rd Char Kway Teow',
    });
  }

  // Scheme 2: Participating Supermarkets ($110 available out of $150)
  // - 10 x $2 vouchers available = $20
  // - 10 x $5 vouchers available = $50
  // - 4 x $10 vouchers available = $40
  // Plus some redeemed $10 vouchers
  for (let i = 1; i <= 10; i++) {
    vouchers.push({
      id: `s-avail-2-${i}`,
      scheme: 'supermarket',
      amount: 2,
      status: 'available',
      code: `CDC-SUP2-2026-${500 + i}`,
    });
  }

  for (let i = 1; i <= 10; i++) {
    vouchers.push({
      id: `s-avail-5-${i}`,
      scheme: 'supermarket',
      amount: 5,
      status: 'available',
      code: `CDC-SUP5-2026-${600 + i}`,
    });
  }

  for (let i = 1; i <= 4; i++) {
    vouchers.push({
      id: `s-avail-10-${i}`,
      scheme: 'supermarket',
      amount: 10,
      status: 'available',
      code: `CDC-SUP10-2026-${700 + i}`,
    });
  }

  // 4 spent supermarket vouchers ($10 each)
  for (let i = 1; i <= 4; i++) {
    vouchers.push({
      id: `s-spent-10-${i}`,
      scheme: 'supermarket',
      amount: 10,
      status: 'redeemed',
      code: `CDC-SUP10-2026-${800 + i}`,
      redeemedAt: '28 Jul 2026, 04:30 PM',
      redeemedMerchant: 'NTUC FairPrice (Bedok North Ave 3)',
    });
  }

  return vouchers;
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-89241',
    scheme: 'hawker',
    voucherIds: ['h-spent-2-1', 'h-spent-2-2', 'h-spent-2-3', 'h-spent-2-4'],
    totalAmount: 8,
    merchantName: 'Ah Seng Hainanese Chicken Rice (#01-42)',
    timestamp: '2 Aug 2026, 12:45 PM',
    referenceCode: 'RD-8841-AH',
  },
  {
    id: 'TX-76102',
    scheme: 'hawker',
    voucherIds: ['h-spent-5-1', 'h-spent-5-2', 'h-spent-5-3', 'h-spent-5-4'],
    totalAmount: 20,
    merchantName: 'Old Airport Rd Char Kway Teow',
    timestamp: '1 Aug 2026, 06:15 PM',
    referenceCode: 'RD-9023-OA',
  },
  {
    id: 'TX-60192',
    scheme: 'supermarket',
    voucherIds: ['s-spent-10-1', 's-spent-10-2', 's-spent-10-3', 's-spent-10-4'],
    totalAmount: 40,
    merchantName: 'NTUC FairPrice (Bedok North Ave 3)',
    timestamp: '28 Jul 2026, 04:30 PM',
    referenceCode: 'RD-5012-FP',
  },
];

export const SINGAPORE_MERCHANTS: Merchant[] = [
  {
    id: 'm-1',
    name: 'Ah Seng Hainanese Chicken Rice',
    category: 'Hawker Stall',
    scheme: 'hawker',
    address: '209 New Upper Changi Rd',
    unit: '#01-42',
    estate: 'Bedok',
    postalCode: '460209',
    verified: true,
  },
  {
    id: 'm-2',
    name: 'Old Amoy Chendol & Traditional Desserts',
    category: 'Hawker Stall',
    scheme: 'hawker',
    address: '51 Old Airport Rd',
    unit: '#01-152',
    estate: 'Tampines',
    postalCode: '390051',
    verified: true,
  },
  {
    id: 'm-3',
    name: 'Teck Kee Traditional Fishball Noodles',
    category: 'Hawker Stall',
    scheme: 'hawker',
    address: '724 Ang Mo Kio Ave 6',
    unit: '#01-18',
    estate: 'Ang Mo Kio',
    postalCode: '560724',
    verified: true,
  },
  {
    id: 'm-4',
    name: 'Lim Brothers Mini-Mart & Sundry',
    category: 'Heartland Shop',
    scheme: 'hawker',
    address: '184 Toa Payoh Central',
    unit: '#01-348',
    estate: 'Toa Payoh',
    postalCode: '310184',
    verified: true,
  },
  {
    id: 'm-5',
    name: 'NTUC FairPrice (Bedok North Ave 3)',
    category: 'Supermarket',
    scheme: 'supermarket',
    address: '212 Bedok North St 1',
    unit: '#01-147',
    estate: 'Bedok',
    postalCode: '460212',
    verified: true,
  },
  {
    id: 'm-6',
    name: 'Sheng Siong Supermarket (Ang Mo Kio 233)',
    category: 'Supermarket',
    scheme: 'supermarket',
    address: '233 Ang Mo Kio Ave 3',
    unit: '#01-1188',
    estate: 'Ang Mo Kio',
    postalCode: '560233',
    verified: true,
  },
  {
    id: 'm-7',
    name: 'Cold Storage (Clementi Mall)',
    category: 'Supermarket',
    scheme: 'supermarket',
    address: '3155 Commonwealth Ave West',
    unit: '#B1-12',
    estate: 'Clementi',
    postalCode: '129588',
    verified: true,
  },
  {
    id: 'm-8',
    name: 'Giant Hypermarket (Tampines Retail Park)',
    category: 'Supermarket',
    scheme: 'supermarket',
    address: '21 Tampines North Drive 2',
    unit: '#03-01',
    estate: 'Tampines',
    postalCode: '528765',
    verified: true,
  },
  {
    id: 'm-9',
    name: 'Sin Man Bok Kopi & Toast',
    category: 'Coffee Shop',
    scheme: 'hawker',
    address: '135 Jurong Gateway Rd',
    unit: '#01-331',
    estate: 'Jurong East',
    postalCode: '600135',
    verified: true,
  },
  {
    id: 'm-10',
    name: 'Hwa Jin TCM & Optical Shop',
    category: 'Heartland Shop',
    scheme: 'hawker',
    address: '303 Woodlands Street 31',
    unit: '#01-181',
    estate: 'Woodlands',
    postalCode: '730303',
    verified: true,
  },
];

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    title: 'CDC Voucher',
    schemeHawkerTitle: 'Participating Hawkers & Heartland Merchants',
    schemeHawkerSubtitle: 'Spend at participating coffee shops, hawker stalls & neighbourhood stores',
    schemeSupermarketTitle: 'Participating Supermarkets',
    schemeSupermarketSubtitle: 'Spend at NTUC FairPrice, Sheng Siong, Cold Storage, Giant, etc.',
    vouchersLeft: 'Vouchers left:',
    shareMyVouchers: 'Share My Vouchers',
    selectVouchersTitle: 'Select your vouchers to use',
    selectVouchersSubtitle: 'Tap individual vouchers below to combine the amount needed for your payment',
    showVoucherBtn: 'Show voucher',
    selectedCount: 'selected',
    noVouchersAvailable: 'No available vouchers in this scheme.',
    resetDemoBtn: 'Reset Demo Pack',
    helpBtn: 'Help & FAQ',
    findMerchants: 'Find Merchants',
    historyBtn: 'History',
    redeemedBadge: 'REDEEMED',
    clearSelection: 'Clear',
    quickSelect: 'Quick Select:',
    allVouchersSpent: 'All vouchers in this category have been used. Check History for details.',
  },
  zh: {
    title: '社理会邻里购物券 (CDC Voucher)',
    schemeHawkerTitle: '参与的小贩与邻里商家',
    schemeHawkerSubtitle: '适用于指定小贩中心、咖啡店及邻里零售店',
    schemeSupermarketTitle: '参与的超级市场',
    schemeSupermarketSubtitle: '适用于职总平价(FairPrice)、昇菘(Sheng Siong)、冷藏公司(Cold Storage)等',
    vouchersLeft: '剩余购物券：',
    shareMyVouchers: '分享购物券链接',
    selectVouchersTitle: '请选择欲使用的购物券',
    selectVouchersSubtitle: '点击选择相应面额的购物券进行组合付款',
    showVoucherBtn: '出示购物券',
    selectedCount: '张已选',
    noVouchersAvailable: '本类别目前没有可用的购物券。',
    resetDemoBtn: '重置测试券',
    helpBtn: '常见问题与防诈骗',
    findMerchants: '寻找参与商家',
    historyBtn: '兑换记录',
    redeemedBadge: '已使用',
    clearSelection: '清空已选',
    quickSelect: '快捷选择：',
    allVouchersSpent: '该类别下的所有购物券已使用完毕。请查看记录。',
  },
  ms: {
    title: 'Baucar CDC',
    schemeHawkerTitle: 'Penjaja & Peniaga Kejiranan yang Menyertai',
    schemeHawkerSubtitle: 'Gunakan di kedai kopi, gerai penjaja & kedai runcit kawasan kejiranan',
    schemeSupermarketTitle: 'Pasar Raya yang Menyertai',
    schemeSupermarketSubtitle: 'Gunakan di NTUC FairPrice, Sheng Siong, Cold Storage, Giant, dsb.',
    vouchersLeft: 'Baki baucar:',
    shareMyVouchers: 'Kongsi Baucar Saya',
    selectVouchersTitle: 'Pilih baucar anda untuk digunakan',
    selectVouchersSubtitle: 'Ketuk baucar di bawah untuk menggabungkan jumlah yang diperlukan',
    showVoucherBtn: 'Tunjuk baucar',
    selectedCount: 'dipilih',
    noVouchersAvailable: 'Tiada baucar tersedia dalam kategori ini.',
    resetDemoBtn: 'Set Semula Baucar',
    helpBtn: 'Bantuan & Soalan Lazim',
    findMerchants: 'Cari Peniaga',
    historyBtn: 'Sejarah',
    redeemedBadge: 'DITEBUS',
    clearSelection: 'Padam',
    quickSelect: 'Pilihan Pantas:',
    allVouchersSpent: 'Semua baucar dalam kategori ini telah digunakan.',
  },
  ta: {
    title: 'CDC வவுச்சர்',
    schemeHawkerTitle: 'பங்கேற்கும் உணவங்காடி & கடைகள்',
    schemeHawkerSubtitle: 'காபி கடைகள் மற்றும் உணவங்காடி கடைகளில் பயன்படுத்தலாம்',
    schemeSupermarketTitle: 'பங்கேற்கும் பல்பொருள் அங்காடிகள்',
    schemeSupermarketSubtitle: 'NTUC FairPrice, Sheng Siong, Cold Storage போன்றவற்றில் பயன்படுத்தலாம்',
    vouchersLeft: 'மீதமுள்ள வவுச்சர்கள்:',
    shareMyVouchers: 'வவுச்சரைப் பகிர்',
    selectVouchersTitle: 'பயன்படுத்த விரும்பும் வவுச்சர்களைத் தேர்ந்தெடுக்கவும்',
    selectVouchersSubtitle: 'தேவையான தொகையை சேர்க்க கீழே உள்ள வவுச்சர்களைத் தட்டவும்',
    showVoucherBtn: 'வவுச்சரைக் காட்டு',
    selectedCount: 'தேர்ந்தெடுக்கப்பட்டது',
    noVouchersAvailable: 'இந்த பிரிவில் வவுச்சர்கள் எதுவும் இல்லை.',
    resetDemoBtn: 'மீண்டும் அமை',
    helpBtn: 'உதவி & கேள்விகள்',
    findMerchants: 'கடைகளைத் தேடு',
    historyBtn: 'வரலாறு',
    redeemedBadge: 'பயன்படுத்தப்பட்டது',
    clearSelection: 'அழி',
    quickSelect: 'விரைவு தேர்வு:',
    allVouchersSpent: 'அனைத்து வவுச்சர்களும் பயன்படுத்தப்பட்டன.',
  },
};
