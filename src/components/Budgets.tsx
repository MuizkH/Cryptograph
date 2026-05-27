import React, { useState, useRef } from 'react';
import { 
  Building2, 
  Plane, 
  Utensils, 
  FileText, 
  Wallet, 
  CheckCircle, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { RWAAsset } from '../types';
import toast from 'react-hot-toast';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface BudgetsProps {
  assets: RWAAsset[];
  onAddAsset: (name: string, limit: number, timePeriod: 'Monthly' | 'Quarterly' | 'Yearly') => void;
}

export default function Budgets({ assets, onAddAsset }: BudgetsProps) {
  const [newName, setNewName] = useState('');
  const [newLimit, setNewLimit] = useState('');
  const [newPeriod, setNewPeriod] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');

  const categoryNameInputRef = useRef<HTMLInputElement>(null);

  // Focus input when "Create New Budget" is clicked
  const handleFocusNewBudget = () => {
    categoryNameInputRef.current?.focus();
    categoryNameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Submit allocation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newLimit) {
      toast.error("Please enter a category name and limit amount.");
      return;
    }
    const limitNum = parseFloat(newLimit);
    if (isNaN(limitNum) || limitNum <= 0) {
      toast.error("Limit must be a positive number.");
      return;
    }

    onAddAsset(newName.trim(), limitNum, newPeriod);
    setNewName('');
    setNewLimit('');
    toast.success(`Initialized digital allocation: ${newName}`);
  };

  // Calculate totals for metadata cards
  const totalAllocation = assets.reduce((sum, item) => sum + item.limit, 0);
  const totalSpent = assets.reduce((sum, item) => sum + item.spent, 0);
  const utilizationPercent = totalAllocation > 0 ? (totalSpent / totalAllocation) * 100 : 0;

  // Render appropriate category icon with high-contrast luxury pairing
  const getCategoryIcon = (name: string) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('house') || lowercaseName.includes('property') || lowercaseName.includes('corporate')) {
      return <Building2 className="w-4 h-4 text-[#C5A880]" />;
    } else if (lowercaseName.includes('travel') || lowercaseName.includes('flight') || lowercaseName.includes('executive')) {
      return <Plane className="w-4 h-4 text-slate-300" />;
    } else if (lowercaseName.includes('dining') || lowercaseName.includes('food') || lowercaseName.includes('client')) {
      return <Utensils className="w-4 h-4 text-white" />;
    }
    return <FileText className="w-4 h-4 text-slate-400" />;
  };

  // Status-based label mapping for flags with fine border colors
  const getStatusLabelColorClass = (item: RWAAsset) => {
    const percent = item.limit > 0 ? (item.spent / item.limit) * 100 : 0;
    if (percent >= 100) return 'text-red-400 bg-red-500/15 border-red-500/30';
    if (percent >= 75) return 'text-white bg-white/10 border-white/20';
    if (percent > 0) return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
    return 'text-slate-300 bg-white/5 border-white/10';
  };

  return (
    <div className="space-y-8 animate-fade-in text-white">
      
      {/* Upper header section */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <h1 className="text-4xl font-serif font-bold italic tracking-tight text-white">Allocations</h1>
          <p className="text-sm text-slate-300 font-medium mt-1 max-w-2xl leading-relaxed">
            Configure, deploy, and monitor multi-node asset velocity across fully verified institutional sub-accounts.
          </p>
        </div>

        {/* Create new budget button for boutique feel */}
        <button
          onClick={handleFocusNewBudget}
          id="budgets-create-new-btn"
          className="bg-[#C5A880] hover:bg-[#b5956a] text-black font-extrabold text-xs py-3 px-5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer uppercase tracking-[0.14em] shadow-lg border border-white/10"
        >
          <span>+</span> Create New Budget
        </button>
      </div>

      {/* Metric Cards Banner of Budgets Page */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Metric 1 */}
        <ScrollReveal delay={0.05} yOffset={25}>
          <div className="bg-black/45 backdrop-blur-xl border border-white/8 rounded-xl p-6.5 flex flex-col justify-between shadow-lg">
            <p className="text-[10px] font-extrabold text-[#C5A880] uppercase tracking-[0.25em]">Total Capital Allocation</p>
            <div className="flex items-baseline justify-between mt-4">
              <span className="text-3xl font-serif font-bold text-white">
                ${totalAllocation.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[9px] font-extrabold tracking-widest uppercase bg-emerald-500/15 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/30">
                Active Fund
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Metric 2 */}
        <ScrollReveal delay={0.15} yOffset={25}>
          <div className="bg-black/45 backdrop-blur-xl border border-white/8 rounded-xl p-6.5 flex flex-col justify-between shadow-lg">
            <p className="text-[10px] font-extrabold text-[#C5A880] uppercase tracking-[0.25em]">Total Capital Velocity (Spent)</p>
            <div className="flex items-baseline justify-between mt-4">
              <span className="text-3xl font-serif font-bold text-white">
                ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[9px] font-extrabold tracking-widest uppercase bg-white/10 text-[#C5A880] px-2.5 py-1 rounded border border-white/10">
                {utilizationPercent.toFixed(1)}% Velocity
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Main Grid: Active Categories List vs Initialize Parameter panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Active Categories Column */}
        <div className="lg:col-span-7 space-y-5">
          <h2 className="text-[10px] font-extrabold text-[#C5A880] uppercase tracking-[0.25em] mb-2">Category Portfolios</h2>
          
          <StaggerContainer className="space-y-4">
            {assets.map((item) => {
              const utilizedPercent = item.limit > 0 ? (item.spent / item.limit) * 100 : 0;
              const labelStyle = getStatusLabelColorClass(item);

              return (
                <StaggerItem key={item.id}>
                  <div className="bg-black/45 backdrop-blur-md border border-white/8 rounded-xl p-5 hover:border-[#C5A880]/30 transition-all duration-200 shadow-md">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          {getCategoryIcon(item.name)}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white tracking-tight">{item.name}</h3>
                          <p className="text-[10px] text-[#C5A880] font-extrabold uppercase mt-0.5 tracking-wider">{item.timePeriod}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-serif font-bold text-white">
                          ${item.spent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-[10px] text-slate-300 font-medium">
                          of ${item.limit.toLocaleString('en-US', { minimumFractionDigits: 0 })} limit
                        </p>
                      </div>
                    </div>

                    {/* Progress Slider Track with glowing indicator */}
                    <div className="space-y-2 mt-4">
                      <div className="w-full h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
                        <div 
                          style={{ width: `${Math.min(utilizedPercent, 100)}%` }}
                          className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-[#C5A880] to-white"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-slate-300">
                          {utilizedPercent.toFixed(1)}% Portfolio Spent
                        </span>
                        <span className={`px-2 py-0.5 rounded border text-[10px] uppercase font-bold tracking-wider ${labelStyle}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Initialize Parameter New Allocation Column */}
        <ScrollReveal className="lg:col-span-5" delay={0.2} yOffset={25}>
          <div className="bg-black/55 backdrop-blur-xl border border-white/8 rounded-xl p-6.5 shadow-xl relative overflow-hidden text-white">
            
            {/* Design header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <Wallet className="w-4 h-4 text-[#C5A880]" />
              </div>
              <div>
                <h3 className="text-sm font-serif font-bold text-white tracking-wide animate-pulse">Initialize Allocation</h3>
                <p className="text-[10px] text-slate-300 font-medium leading-normal">Deploy new capital boundary triggers.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#C5A880] uppercase tracking-[0.2em] mb-2">
                  Category Name
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-[#C5A880]/70">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <input
                    ref={categoryNameInputRef}
                    id="allocation-name-input"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Real Estate Development"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#C5A880] focus:outline-none rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-slate-400 transition-colors"
                  />
                </div>
              </div>

              {/* Limit */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#C5A880] uppercase tracking-[0.2em] mb-2">
                  Maximum Limit Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-sm text-white font-bold">$</span>
                  <input
                    id="allocation-limit-input"
                    type="number"
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#C5A880] focus:outline-none rounded-lg py-3 pl-8 pr-4 text-sm text-white placeholder-slate-400 font-serif transition-colors"
                  />
                </div>
              </div>

              {/* Time Period Dropdown */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#C5A880] uppercase tracking-[0.2em] mb-2">
                  Allocation Frequency
                </label>
                <div className="relative select-none">
                  <select
                    id="allocation-period-dropdown"
                    value={newPeriod}
                    onChange={(e) => setNewPeriod(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#C5A880] focus:outline-none rounded-lg py-3 px-4 text-sm text-white appearance-none cursor-pointer"
                  >
                    <option value="Monthly" className="bg-[#121214] text-white">Monthly Cycle</option>
                    <option value="Quarterly" className="bg-[#121214] text-white">Quarterly Cycle</option>
                    <option value="Yearly" className="bg-[#121214] text-white">Yearly Cycle</option>
                  </select>
                  <span className="absolute right-4 top-3.5 text-slate-300 pointer-events-none">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                id="allocation-submit-btn"
                type="submit"
                className="w-full bg-[#C5A880] hover:bg-[#b5956a] text-black font-extrabold text-xs py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer uppercase tracking-wider shadow-lg border border-white/10"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Initialize Parameter</span>
              </button>
            </form>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
