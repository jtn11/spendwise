"use client";

import { X, Calendar, DollarSign, Tag, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import type { Subscription, BillingCycle } from "@/lib/types";

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddSubscriptionModal({ isOpen, onClose }: AddSubscriptionModalProps) {
  const [isMounting, setIsMounting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    billingCycle: "Monthly" as BillingCycle,
    category: "Entertainment",
    nextBillingDate: "",
    autoRenew: true,
  });

  // Handle entry animation coordination
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsMounting(true), 10);
    } else {
      setIsMounting(false);
    }
  }, [isOpen]);

  if (!isOpen && !isMounting) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Firebase
    console.log("Submitting:", formData);
    onClose();
  };

  return (
    <div 
      className={`fixed inset-0 z-[1000] flex items-center justify-center transition-all duration-300 ${isMounting ? 'opacity-100 backdrop-blur-md bg-[var(--on-surface)]/40' : 'opacity-0 bg-transparent'}`}
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-md bg-[var(--surface-container-lowest)] rounded-3xl p-6 sm:p-8 shadow-2xl relative transition-all duration-300 mx-4 ${isMounting ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-display font-extrabold text-2xl text-[var(--on-surface)] mb-2">New Subscription</h2>
        <p className="text-sm text-[var(--on-surface-variant)] mb-8">Enter the details below to track this service.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Service Name */}
          <div>
            <label className="block text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">Service Name</label>
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--outline)]" />
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[var(--surface-container-low)] border border-transparent focus:border-[var(--primary)] focus:bg-[var(--surface-container-lowest)] rounded-xl py-3 pl-11 pr-4 text-[var(--on-surface)] text-sm transition-all focus:ring-4 focus:ring-[var(--primary)]/10 outline-none"
                placeholder="e.g. Netflix Premium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">Price</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--outline)]" />
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-[var(--surface-container-low)] border border-transparent focus:border-[var(--primary)] focus:bg-[var(--surface-container-lowest)] rounded-xl py-3 pl-11 pr-4 text-[var(--on-surface)] text-sm transition-all focus:ring-4 focus:ring-[var(--primary)]/10 outline-none"
                  placeholder="15.99"
                />
              </div>
            </div>

            {/* Billing Cycle */}
            <div>
              <label className="block text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">Billing Cycle</label>
              <div className="relative">
                <RefreshCw className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--outline)]" />
                <select 
                  value={formData.billingCycle}
                  onChange={(e) => setFormData({...formData, billingCycle: e.target.value as BillingCycle})}
                  className="w-full bg-[var(--surface-container-low)] border border-transparent focus:border-[var(--primary)] focus:bg-[var(--surface-container-lowest)] rounded-xl py-3 pl-11 pr-4 text-[var(--on-surface)] text-sm transition-all focus:ring-4 focus:ring-[var(--primary)]/10 outline-none appearance-none"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-[var(--surface-container-low)] border border-transparent focus:border-[var(--primary)] focus:bg-[var(--surface-container-lowest)] rounded-xl py-3 px-4 text-[var(--on-surface)] text-sm transition-all focus:ring-4 focus:ring-[var(--primary)]/10 outline-none appearance-none"
              >
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
                <option value="Software">Software</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Next Billing Date */}
            <div>
              <label className="block text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">Next Billing</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--outline)] hidden sm:block" />
                <input 
                  type="date"
                  required
                  value={formData.nextBillingDate}
                  onChange={(e) => setFormData({...formData, nextBillingDate: e.target.value})}
                  className="w-full bg-[var(--surface-container-low)] border border-transparent focus:border-[var(--primary)] focus:bg-[var(--surface-container-lowest)] rounded-xl py-3 sm:pl-10 px-3 text-[var(--on-surface)] text-sm transition-all focus:ring-4 focus:ring-[var(--primary)]/10 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-sm font-bold text-[var(--on-surface)]">Auto-renew active</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={formData.autoRenew}
                onChange={(e) => setFormData({...formData, autoRenew: e.target.checked})}
              />
              <div className="w-11 h-6 bg-[var(--surface-container-highest)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
            </label>
          </div>

          <button 
            type="submit"
            className="w-full mt-4 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] hover:scale-[1.02] text-[var(--on-primary)] py-4 rounded-xl font-bold shadow-lg shadow-[var(--primary)]/20 transition-all active:scale-95"
          >
            Add Subscription
          </button>
        </form>
      </div>
    </div>
  );
}
