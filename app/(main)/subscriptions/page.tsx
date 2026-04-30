"use client";

import { Search, Filter, Plus, PiggyBank } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import type { Subscription } from "@/lib/types";

export default function SubscriptionsPage() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    window.dispatchEvent(new CustomEvent("openAddModal"));
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const response = await fetch(`/api/subscriptions?userId=${user.uid}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        console.error("Error loading subscriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();

    // Re-fetch when modal is closed (if a new one was added)
    // We can use a custom event or just trust the user to refresh if needed, 
    // but better to add an event listener.
    const handleRefresh = () => fetchSubscriptions();
    window.addEventListener("refreshSubscriptions", handleRefresh);
    return () => window.removeEventListener("refreshSubscriptions", handleRefresh);
  }, [user]);

  const totalMonthly = subscriptions.reduce((acc, sub) => {
    if (sub.billingCycle === "Monthly") return acc + sub.price;
    if (sub.billingCycle === "Weekly") return acc + sub.price * 4;
    if (sub.billingCycle === "Yearly") return acc + sub.price / 12;
    return acc;
  }, 0);

  const activeCount = subscriptions.filter(sub => sub.autoRenew).length;

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto animate-in fade-in duration-500">
      {/* Header & Stats Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-display font-extrabold text-[var(--on-surface)] tracking-tight mb-2">Subscriptions</h1>
          <p className="text-[var(--on-surface-variant)] max-w-md">Manage your digital footprint and optimize your monthly recurring expenses.</p>
        </div>
        
        {/* Asymmetrical Bento Stat Card */}
        <div className="bg-[var(--surface-container-lowest)] p-6 rounded-[2rem] shadow-sm flex items-center gap-8 pr-12 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[var(--primary)]/5 rounded-full blur-2xl"></div>
          <div className="relative">
            <p className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mb-1">Total Monthly</p>
            <p className="text-4xl font-display font-extrabold text-[var(--primary)]">${totalMonthly.toFixed(2)}</p>
          </div>
          <div className="h-12 w-px bg-[var(--outline-variant)]/30"></div>
          <div className="relative">
            <p className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mb-1">Active Now</p>
            <p className="text-4xl font-display font-extrabold text-[var(--secondary)]">{activeCount}</p>
          </div>
        </div>
      </div>

      {/* Filters & Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--on-surface-variant)]" />
            <input 
              className="w-full pl-12 pr-4 py-3 bg-[var(--surface-container-low)] border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm font-medium text-[var(--on-surface)]" 
              placeholder="Filter by name or service..." 
              type="text"
            />
          </div>
          <button className="p-3 bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] rounded-full hover:bg-[var(--surface-container)] transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 bg-[var(--surface-container-low)] p-1.5 rounded-full">
          <button className="px-5 py-2 bg-[var(--surface-container-lowest)] shadow-sm rounded-full text-sm font-bold text-[var(--primary)]">All</button>
          <button className="px-5 py-2 text-sm font-medium text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors">Active</button>
          <button className="px-5 py-2 text-sm font-medium text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors">Paused</button>
        </div>
        
        <button 
          onClick={openModal}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] text-[var(--on-primary)] rounded-full font-bold shadow-lg shadow-[var(--primary)]/20 hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5" />
          <span>Add New</span>
        </button>
      </div>

      {/* Subscription List Content */}
      <div className="space-y-3">
        {/* Header Row (Labels) */}
        <div className="grid grid-cols-12 gap-4 px-8 py-2 hidden md:grid">
          <div className="col-span-4"><span className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">Subscription Service</span></div>
          <div className="col-span-2"><span className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest text-center">Billing Cycle</span></div>
          <div className="col-span-2"><span className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">Next Bill</span></div>
          <div className="col-span-2 text-right"><span className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">Monthly Cost</span></div>
          <div className="col-span-2 text-right"><span className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">Status</span></div>
        </div>

        {/* List Items */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[var(--on-surface-variant)]">
            <div className="w-12 h-12 border-4 border-[var(--primary)]/20 border-t-[var(--primary)] rounded-full animate-spin mb-4"></div>
            <p className="font-medium">Loading your subscriptions...</p>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[var(--surface-container-lowest)] rounded-3xl border-2 border-dashed border-[var(--outline-variant)]">
            <PiggyBank className="w-16 h-16 text-[var(--outline)] mb-4" />
            <h3 className="text-xl font-display font-bold text-[var(--on-surface)] mb-2">No subscriptions yet</h3>
            <p className="text-[var(--on-surface-variant)] mb-8">Add your first subscription to start tracking.</p>
            <button 
              onClick={openModal}
              className="px-8 py-3 bg-[var(--primary)] text-[var(--on-primary)] rounded-full font-bold shadow-lg shadow-[var(--primary)]/20 hover:scale-105 transition-transform"
            >
              Add Your First One
            </button>
          </div>
        ) : (
          subscriptions.map((sub) => {
            const status = sub.autoRenew ? "Active" : "Paused";
            const formattedDate = new Date(sub.nextBillingDate).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric'
            });
            
            return (
              <div key={sub.id} className={`grid grid-cols-12 gap-4 items-center px-8 py-5 rounded-xl transition-all group ${status === 'Paused' ? 'bg-[var(--surface-container-low)]/50 shadow-sm opacity-80 grayscale hover:grayscale-0' : 'bg-[var(--surface-container-lowest)] shadow-sm hover:shadow-md'}`}>
                
                {/* Logo and Name */}
                <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--surface-container)] flex items-center justify-center p-2 overflow-hidden shadow-sm">
                    <div className="w-full h-full flex items-center justify-center bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-xl rounded-lg">
                      {sub.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-[var(--on-surface)] group-hover:text-[var(--primary)] transition-colors">{sub.name}</h3>
                    <p className="text-xs text-[var(--on-surface-variant)]">{sub.category}</p>
                  </div>
                </div>

                {/* Billing Cycle */}
                <div className="col-span-4 md:col-span-2 flex justify-center">
                  <span className="text-xs font-bold text-[var(--on-surface-variant)] bg-[var(--surface-container)] px-3 py-1 rounded-full uppercase tracking-tighter">{sub.billingCycle}</span>
                </div>

                {/* Next Bill */}
                <div className="col-span-4 md:col-span-2">
                  <p className={`text-sm font-medium ${status === 'Paused' ? 'text-[var(--on-surface-variant)] italic' : 'text-[var(--on-surface)]'}`}>{formattedDate}</p>
                </div>

                {/* Cost */}
                <div className="col-span-4 md:col-span-2 text-right">
                  <p className={`text-xl font-display font-bold ${status === 'Paused' ? 'text-[var(--on-surface-variant)]' : 'text-[var(--on-surface)]'}`}>${sub.price.toFixed(2)}</p>
                </div>

                {/* Status Badge */}
                <div className="col-span-12 md:col-span-2 flex justify-end">
                  {status === "Active" && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-[var(--secondary-container)] text-[var(--on-secondary-container)] rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-[var(--secondary)] rounded-full animate-pulse"></span> Active
                    </span>
                  )}
                  {status === "Paused" && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-[var(--surface-container-highest)] text-[var(--on-surface-variant)] rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-[var(--on-surface-variant)] rounded-full"></span> Paused
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Summary (Glassmorphism Insight) */}
      <div className="mt-12 p-8 bg-[var(--surface-container-low)]/40 backdrop-blur-xl rounded-[2.5rem] border border-white/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-[var(--surface-container-lowest)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--primary)]/5">
            <PiggyBank className="text-[var(--primary)] w-8 h-8" />
          </div>
          <div>
            <h4 className="font-display font-bold text-xl text-[var(--on-surface)]">Vault Insight</h4>
            <p className="text-[var(--on-surface-variant)] text-sm">You could save <span className="font-bold text-[var(--secondary)]">$145.00/year</span> by switching Adobe to an annual plan.</p>
          </div>
        </div>
        <button className="px-8 py-3 bg-[var(--on-surface)] text-[var(--surface)] rounded-full font-bold text-sm hover:bg-[var(--primary)] transition-colors shadow-md">
          View All Insights
        </button>
      </div>
    </div>
  );
}
