"use client";

import { useAuth } from "@/components/AuthProvider";
import { Plus, CreditCard, Calendar, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  // Mock data for initial MVP view
  const totalMonthly = 145.99;
  const totalYearly = totalMonthly * 12;
  const activeSubs = 8;
  const upcomingRenewals = [
    { id: 1, name: "Netflix", amount: 15.99, date: "Tomorrow" },
    { id: 2, name: "Figma", amount: 12.00, date: "In 3 days" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Welcome, {user?.displayName?.split(" ")[0] || "User"}</h1>
          <p className="text-[var(--color-muted)] mt-1">Here's your subscription overview for this month.</p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          Add Subscription
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
          <div className="flex items-center gap-3 text-[var(--color-muted)] mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-500" />
            </div>
            <span className="font-medium">Monthly Spend</span>
          </div>
          <p className="text-4xl font-bold text-[var(--foreground)]">${totalMonthly.toFixed(2)}</p>
          <p className="text-sm text-[var(--color-muted)] mt-2">≈ ${(totalYearly).toFixed(2)} / year</p>
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
          <div className="flex items-center gap-3 text-[var(--color-muted)] mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
              <ListIcon className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="font-medium">Active Subscriptions</span>
          </div>
          <p className="text-4xl font-bold text-[var(--foreground)]">{activeSubs}</p>
          <p className="text-sm text-[var(--color-muted)] mt-2">Across 4 categories</p>
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-red-100 dark:border-red-900/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="flex items-center gap-3 text-[var(--color-muted)] mb-4">
            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-red-500" />
            </div>
            <span className="font-medium">Upcoming & Alerts</span>
          </div>
          <p className="text-4xl font-bold text-[var(--foreground)]">{upcomingRenewals.length}</p>
          <p className="text-sm text-red-500 dark:text-red-400 mt-2 font-medium">Renewing within 7 days</p>
        </div>
      </div>

      {/* Upcoming Renewals List */}
      <div>
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-[var(--color-muted)]" />
          Attention Required
        </h2>
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm">
          {upcomingRenewals.map((sub, i) => (
            <div key={sub.id} className={`flex items-center justify-between p-4 ${i !== upcomingRenewals.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center font-bold text-[var(--color-muted)] text-xl">
                  {sub.name[0]}
                </div>
                <div>
                  <p className="font-medium text-[var(--foreground)]">{sub.name}</p>
                  <p className="text-sm text-[var(--color-muted)]">Renews {sub.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[var(--foreground)]">${sub.amount.toFixed(2)}</p>
                <button className="text-sm font-medium text-[var(--color-brand)] hover:underline mt-1">Review</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Quick inline icon component to avoid extra imports for layout consistency
function ListIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  );
}
