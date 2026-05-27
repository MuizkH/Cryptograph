import React, { useState } from 'react';
import { X, Sparkles, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface AddTransactionModalProps {
  onClose: () => void;
  onAddTransaction: (merchant: string, category: any, status: any, amount: number) => void;
}

export default function AddTransactionModal({ onClose, onAddTransaction }: AddTransactionModalProps) {
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState<'Groceries' | 'Investment' | 'Rent' | 'Dining' | 'Health & Fitness' | 'Income' | 'Travel' | 'Other'>('Groceries');
  const [status, setStatus] = useState<'Completed' | 'Pending' | 'Failed'>('Completed');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'debit' | 'credit'>('debit');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchant.trim()) {
      toast.error('Please enter a merchant name.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Please enter a valid positive numerical amount.');
      return;
    }

    // Outflow is negative, inflow is positive
    const finalAmount = type === 'debit' ? -parsedAmount : parsedAmount;

    onAddTransaction(merchant.trim(), category, status, finalAmount);
    toast.success(`Registered transaction: ${merchant}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050507]/82 backdrop-blur-md animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-full max-w-md bg-[#101012] border border-white/12 rounded-xl p-8 shadow-2xl relative overflow-hidden text-white"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A880]/15 rounded-full blur-2xl pointer-events-none" />
        
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/8 pb-4 mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <PlusCircle className="w-4 h-4 text-[#C5A880]" />
            <h3 className="text-base font-serif font-bold italic tracking-tight text-white">New Transaction</h3>
          </div>
          <button 
            id="modal-close-icon"
            type="button"
            onClick={onClose}
            className="p-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer relative z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form content */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Outflow vs Inflow Toggle switcher */}
          <div>
            <label className="block text-[10px] font-extrabold text-[#C5A880] uppercase tracking-[0.2em] mb-2">
              Transaction Vector Type
            </label>
            <div className="grid grid-cols-2 gap-2 bg-white/5 border border-white/8 p-1 rounded-lg">
              <button
                type="button"
                id="toggle-debit-vector"
                onClick={() => setType('debit')}
                className={`py-2 px-3 rounded text-xs font-bold transition-all cursor-pointer ${
                  type === 'debit' 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Outflow (Debit)
              </button>
              <button
                type="button"
                id="toggle-credit-vector"
                onClick={() => setType('credit')}
                className={`py-2 px-3 rounded text-xs font-bold transition-all cursor-pointer ${
                  type === 'credit' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Inflow (Credit)
              </button>
            </div>
          </div>

          {/* Merchant */}
          <div>
            <label className="block text-[10px] font-extrabold text-[#C5A880] uppercase tracking-[0.2em] mb-2">
              Merchant / Counterparty
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-[#C5A880]/70">
                <Sparkles className="w-4 h-4" />
              </span>
              <input
                id="modal-merchant-input"
                type="text"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                placeholder="e.g. Starbucks, Amazon Host"
                className="w-full bg-white/5 border border-white/10 focus:border-[#C5A880] focus:outline-none rounded-lg py-2.5 pl-9 pr-4 text-xs text-white placeholder-slate-400"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[10px] font-extrabold text-[#C5A880] uppercase tracking-[0.2em] mb-2">
              Allocation Category
            </label>
            <select
              id="modal-category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-white/5 border border-white/10 focus:border-[#C5A880] focus:outline-none rounded-lg py-2.5 px-3 text-xs text-white cursor-pointer"
            >
              <option value="Groceries" className="bg-[#121214] text-white">Groceries</option>
              <option value="Investment" className="bg-[#121214] text-white">Investment</option>
              <option value="Rent" className="bg-[#121214] text-white">Rent</option>
              <option value="Dining" className="bg-[#121214] text-white">Dining</option>
              <option value="Health & Fitness" className="bg-[#121214] text-white">Health & Fitness</option>
              <option value="Income" className="bg-[#121214] text-white">Income</option>
              <option value="Travel" className="bg-[#121214] text-white">Travel</option>
              <option value="Other" className="bg-[#121214] text-white">Other</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-[10px] font-extrabold text-[#C5A880] uppercase tracking-[0.2em] mb-2">
              Valuation Limit Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-2 text-xs text-white font-bold">$</span>
              <input
                id="modal-amount-input"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 focus:border-[#C5A880] focus:outline-none rounded-lg py-2.5 pl-8 pr-4 text-xs text-white placeholder-slate-400 font-serif"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[10px] font-extrabold text-[#C5A880] uppercase tracking-[0.2em] mb-2">
              Completion Status Flow
            </label>
            <select
              id="modal-status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full bg-white/5 border border-white/10 focus:border-[#C5A880] focus:outline-none rounded-lg py-2.5 px-3 text-xs text-white cursor-pointer"
            >
              <option value="Completed" className="bg-[#121214] text-white">Completed</option>
              <option value="Pending" className="bg-[#121214] text-white">Pending</option>
              <option value="Failed" className="bg-[#121214] text-white">Failed</option>
            </select>
          </div>

          {/* Submit Action */}
          <button
            id="modal-submit-btn"
            type="submit"
            className="w-full bg-[#C5A880] hover:bg-[#b5956a] text-black font-extrabold text-xs py-3 rounded-lg transition-colors cursor-pointer uppercase tracking-widest mt-2.5 border border-white/10 shadow-lg"
          >
            Append Transaction Ledger
          </button>
        </form>
      </div>
    </div>
  );
}
