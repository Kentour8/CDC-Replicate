import React, { useState } from 'react';
import { X, Search, Store, MapPin, CheckCircle, ExternalLink, Filter } from 'lucide-react';
import { Merchant, SchemeType } from '../types';

interface MerchantModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchants: Merchant[];
  onSelectMerchant: (merchant: Merchant) => void;
}

export const MerchantModal: React.FC<MerchantModalProps> = ({
  isOpen,
  onClose,
  merchants,
  onSelectMerchant,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState<'all' | SchemeType>('all');
  const [selectedEstate, setSelectedEstate] = useState<string>('All Estates');

  if (!isOpen) return null;

  const estates = ['All Estates', 'Ang Mo Kio', 'Bedok', 'Tampines', 'Toa Payoh', 'Jurong East', 'Clementi', 'Woodlands'];

  const filteredMerchants = merchants.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.estate.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesScheme =
      selectedSchemeFilter === 'all' ? true : m.scheme === selectedSchemeFilter;

    const matchesEstate =
      selectedEstate === 'All Estates' ? true : m.estate === selectedEstate;

    return matchesSearch && matchesScheme && matchesEstate;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        {/* Header bar */}
        <div className="bg-[#1b2845] text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold">Participating Merchants</h3>
              <p className="text-[11px] text-blue-200">
                Hawkers, heartland shops & supermarkets in Singapore
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

        {/* Search and Filters */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search stall name, address or estate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Scheme category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedSchemeFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedSchemeFilter === 'all'
                  ? 'bg-[#1b2845] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setSelectedSchemeFilter('hawker')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedSchemeFilter === 'hawker'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              🍜 Hawkers & Heartland Merchants
            </button>
            <button
              onClick={() => setSelectedSchemeFilter('supermarket')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedSchemeFilter === 'supermarket'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              🛒 Supermarkets
            </button>
          </div>

          {/* Estate selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {estates.map((est) => (
              <button
                key={est}
                onClick={() => setSelectedEstate(est)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                  selectedEstate === est
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {est}
              </button>
            ))}
          </div>
        </div>

        {/* Merchant list */}
        <div className="overflow-y-auto p-4 space-y-3 flex-1">
          {filteredMerchants.length > 0 ? (
            filteredMerchants.map((merchant) => (
              <div
                key={merchant.id}
                className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">
                      {merchant.name}
                    </span>
                    {merchant.verified && (
                      <span title="Verified CDC Merchant">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600 inline" />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {merchant.address} ({merchant.unit}) • {merchant.estate}
                    </span>
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 mt-1">
                    {merchant.category} •{' '}
                    {merchant.scheme === 'hawker'
                      ? 'Hawker / Merchant Scheme'
                      : 'Supermarket Scheme'}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectMerchant(merchant);
                    onClose();
                  }}
                  className="shrink-0 px-3 py-1.5 bg-[#1b2845] hover:bg-[#283d6e] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
                >
                  Use Voucher
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Store className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No merchants found matching your search</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 shrink-0">
          Showing {filteredMerchants.length} of {merchants.length} participating Singapore merchants
        </div>
      </div>
    </div>
  );
};
