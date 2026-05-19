"use client";

import { TrendingDown, PlayCircle, Cloud, Briefcase, PiggyBank, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import type { Subscription } from "@/lib/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, [user]);

  const totalMonthly = subscriptions.reduce((acc, sub) => {
    if (sub.billingCycle === "Monthly") return acc + sub.price;
    if (sub.billingCycle === "Weekly") return acc + sub.price * 4;
    if (sub.billingCycle === "Yearly") return acc + sub.price / 12;
    return acc;
  }, 0);

  const activeCount = subscriptions.filter(sub => sub.autoRenew).length;

  const yearlySavings = subscriptions
    .filter(sub => !sub.autoRenew)
    .reduce((acc, sub) => {
      if (sub.billingCycle === "Monthly") return acc + sub.price * 12;
      if (sub.billingCycle === "Weekly") return acc + sub.price * 52;
      if (sub.billingCycle === "Yearly") return acc + sub.price;
      return acc;
    }, 0);

  const categorySpend = subscriptions.reduce((acc, sub) => {
    if (!sub.autoRenew) return acc;

    let monthlyCost = 0;
    if (sub.billingCycle === "Monthly") monthlyCost = sub.price;
    if (sub.billingCycle === "Weekly") monthlyCost = sub.price * 4;
    if (sub.billingCycle === "Yearly") monthlyCost = sub.price / 12;
    
    acc[sub.category] = (acc[sub.category] || 0) + monthlyCost;
    return acc;
  }, {} as Record<string, number>);

  const activeTotalSpend = Object.values(categorySpend).reduce((a, b) => a + b, 0);

  const sortedCategories = Object.entries(categorySpend)
    .sort((a, b) => b[1] - a[1])
    .map(([name, amount]) => ({
      name,
      amount,
      percentage: activeTotalSpend > 0 ? (amount / activeTotalSpend) * 100 : 0
    }));

  const chartColors = [
    { text: "text-[var(--primary)]", bg: "bg-[var(--primary)]" },
    { text: "text-[var(--secondary)]", bg: "bg-[var(--secondary)]" },
    { text: "text-[#006976]", bg: "bg-[#006976]" },
    { text: "text-[#1e333c]", bg: "bg-[#1e333c]" },
    { text: "text-[#cfe6f2]", bg: "bg-[#cfe6f2]" },
  ];

  let currentCumulative = 100;
  const categoriesWithCumulative = sortedCategories.map((cat, index) => {
    const cumulativeToDraw = currentCumulative;
    currentCumulative -= cat.percentage;
    return {
      ...cat,
      cumulative: cumulativeToDraw,
      colors: chartColors[index % chartColors.length]
    };
  });

  const topCategory = sortedCategories.length > 0 ? sortedCategories[0] : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingRenewals = [...subscriptions]
    .filter(sub => sub.autoRenew && sub.nextBillingDate && new Date(sub.nextBillingDate) >= today)
    .sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime())
    .slice(0, 3);

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-500">
      {/* Bento Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Spend Card */}
        <div className="lg:col-span-8 bg-[var(--surface-container-lowest)] p-8 rounded-[2rem] shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl group-hover:bg-[var(--primary)]/10 transition-colors"></div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--on-surface-variant)]">
              Monthly Investment
            </span>
            <h3 className="text-5xl md:text-7xl font-display font-extrabold text-[var(--on-surface)] mt-2">
              ${totalMonthly.toFixed(2)}
            </h3>
            <div className="flex items-center gap-2 mt-4">
              <span className="flex items-center text-[var(--secondary)] font-bold text-sm bg-[var(--secondary-container)] px-3 py-1 rounded-full">
                <TrendingDown className="w-4 h-4 mr-1" />
                12% lower than last month
              </span>
            </div>
          </div>
          
          <div className="mt-12 flex gap-4 overflow-x-auto pb-2 hidden-scrollbar">
            <div className="flex-shrink-0 bg-[var(--surface-container-low)] px-6 py-4 rounded-xl min-w-[140px]">
              <p className="text-xs text-[var(--on-surface-variant)] font-medium">Subscriptions</p>
              <p className="text-xl font-bold mt-1">{subscriptions.length} Total</p>
            </div>
            <div className="flex-shrink-0 bg-[var(--surface-container-low)] px-6 py-4 rounded-xl min-w-[140px]">
              <p className="text-xs text-[var(--on-surface-variant)] font-medium">Auto-renew</p>
              <p className="text-xl font-bold mt-1">{activeCount} Items</p>
            </div>
            <div className="flex-shrink-0 bg-[var(--surface-container-low)] px-6 py-4 rounded-xl min-w-[140px]">
              <p className="text-xs text-[var(--on-surface-variant)] font-medium">Yearly Savings</p>
              <p className="text-xl font-bold text-[var(--secondary)] mt-1">${yearlySavings.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Circular Allocation Chart Card */}
        <div className="lg:col-span-4 bg-[var(--surface-container-high)] p-8 rounded-[2rem] flex flex-col items-center justify-center text-center relative overflow-hidden">
          <h4 className="font-display font-bold text-lg mb-6 text-[var(--on-surface)]">Spend Allocation</h4>
          
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Custom SVG Doughnut */}
            <svg className="w-full h-full transform -rotate-90">
              <circle className="text-[var(--surface-container-highest)]" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="20"></circle>
              {categoriesWithCumulative.map((cat, i) => {
                const dashoffset = 502 - (cat.cumulative / 100) * 502;
                return (
                  <circle 
                    key={cat.name}
                    className={cat.colors.text} 
                    cx="96" 
                    cy="96" 
                    fill="transparent" 
                    r="80" 
                    stroke="currentColor" 
                    strokeDasharray="502" 
                    strokeDashoffset={dashoffset} 
                    strokeWidth="20"
                    style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                  ></circle>
                );
              })}
            </svg>
            <div className="absolute flex flex-col items-center">
              {topCategory ? (
                <>
                  <span className="text-2xl font-black font-display text-[var(--on-surface)]">{Math.round(topCategory.percentage)}%</span>
                  <span className="text-[10px] uppercase font-bold text-[var(--on-surface-variant)] truncate max-w-[80px]">{topCategory.name}</span>
                </>
              ) : (
                <>
                  <span className="text-2xl font-black font-display text-[var(--on-surface)]">0%</span>
                  <span className="text-[10px] uppercase font-bold text-[var(--on-surface-variant)]">N/A</span>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {sortedCategories.slice(0, 3).map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-1.5 text-[var(--on-surface)]">
                <div className={`w-2.5 h-2.5 rounded-full ${categoriesWithCumulative[i].colors.bg}`}></div>
                <span className="text-xs font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Asymmetric Grid: Due Soon & List */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Due Soon Section */}
        <div className="xl:col-span-5 space-y-4">
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-display font-bold text-xl text-[var(--on-surface)]">Upcoming Renewals</h3>
            <a className="text-sm font-bold text-[var(--primary)] hover:underline underline-offset-4" href="#">
              View Calendar
            </a>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8 text-[var(--on-surface-variant)] text-sm">
                <div className="w-8 h-8 border-4 border-[var(--primary)]/20 border-t-[var(--primary)] rounded-full animate-spin mx-auto mb-3"></div>
                Loading renewals...
              </div>
            ) : upcomingRenewals.length === 0 ? (
              <div className="text-center py-8 bg-[var(--surface-container-lowest)] rounded-xl border border-dashed border-[var(--outline-variant)] text-[var(--on-surface-variant)] text-sm">
                No upcoming renewals found.
              </div>
            ) : (
              upcomingRenewals.map((sub, index) => {
                const targetDate = new Date(sub.nextBillingDate);
                const diffTime = targetDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                const formattedDate = targetDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });

                let statusText = "";
                let statusColor = "";
                if (diffDays === 0) {
                  statusText = "Due today";
                  statusColor = "bg-[var(--error-container)] text-[var(--on-error-container)]";
                } else if (diffDays <= 3) {
                  statusText = `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
                  statusColor = "bg-[var(--error-container)] text-[var(--on-error-container)]";
                } else {
                  statusText = `Due in ${diffDays} days`;
                  statusColor = "bg-[var(--secondary-container)] text-[var(--on-secondary-container)]";
                }

                const icons = [PlayCircle, Briefcase, Cloud, CreditCard];
                const Icon = icons[index % icons.length];
                const colors = ["bg-[#1e333c] text-white", "bg-[#cfe6f2] text-[var(--primary)]", "bg-[#004f5a] text-[#9eefff]"];
                const colorClass = colors[index % colors.length];

                return (
                  <div 
                    key={sub.id} 
                    onClick={() => window.dispatchEvent(new CustomEvent("openAddModal", { detail: { subscription: sub } }))}
                    className="bg-[var(--surface-container-lowest)] p-5 rounded-xl flex items-center justify-between group hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-sans font-semibold text-sm text-[var(--on-surface)]">{sub.name}</h4>
                        <p className="text-xs text-[var(--on-surface-variant)]">Billed on {formattedDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-sm text-[var(--on-surface)]">${sub.price.toFixed(2)}</p>
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full mt-1 ${statusColor}`}>
                        {statusText}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Activity / History Card */}
        <div className="xl:col-span-7 bg-[var(--surface-container-low)] rounded-[2.5rem] p-1 shadow-inner h-full flex flex-col">
          <div className="bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-8 h-full flex flex-col justify-between">
            
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display font-bold text-xl text-[var(--on-surface)]">Spending Insights</h3>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 text-xs font-bold rounded-full bg-[var(--surface-container-highest)] text-[var(--on-surface)] hover:bg-[var(--surface-container)] transition-colors">Weekly</button>
                <button className="px-4 py-1.5 text-xs font-bold rounded-full bg-[var(--primary)] text-[var(--on-primary)] shadow-sm">Monthly</button>
              </div>
            </div>

            {/* Visual Bar Graph Representation */}
            <div className="flex items-end justify-between h-48 px-4 gap-4">
              <div className="flex-1 bg-[var(--surface-container-low)] rounded-t-full relative group">
                <div className="absolute bottom-0 w-full bg-[var(--primary)]/20 rounded-t-full h-[40%] group-hover:h-[45%] transition-all"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[var(--on-surface-variant)]">JUL</span>
              </div>
              <div className="flex-1 bg-[var(--surface-container-low)] rounded-t-full relative group">
                <div className="absolute bottom-0 w-full bg-[var(--primary)]/20 rounded-t-full h-[65%] group-hover:h-[70%] transition-all"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[var(--on-surface-variant)]">AUG</span>
              </div>
              <div className="flex-1 bg-[var(--surface-container-low)] rounded-t-full relative group">
                <div className="absolute bottom-0 w-full bg-[var(--primary)] rounded-t-full h-[90%] group-hover:h-[95%] transition-all shadow-[0_-4px_10px_rgba(0,71,141,0.2)]"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[var(--primary)]">SEP</span>
              </div>
              <div className="flex-1 bg-[var(--surface-container-low)] rounded-t-full relative group">
                <div className="absolute bottom-0 w-full bg-[var(--primary)]/20 rounded-t-full h-[55%] group-hover:h-[60%] transition-all"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[var(--on-surface-variant)]">OCT</span>
              </div>
              <div className="flex-1 bg-[var(--surface-container-low)] rounded-t-full relative group">
                <div className="absolute bottom-0 w-full bg-[var(--primary)]/20 rounded-t-full h-[30%] group-hover:h-[35%] transition-all"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[var(--on-surface-variant)]">NOV</span>
              </div>
            </div>

            <div className="mt-16 bg-[var(--surface-container-low)] p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[var(--secondary-container)] flex items-center justify-center text-[var(--on-secondary-container)] shadow-sm">
                <PiggyBank className="w-8 h-8" />
              </div>
              <div className="text-center md:text-left">
                <h5 className="font-display font-bold text-base text-[var(--on-surface)]">Potential Savings Detected</h5>
                <p className="text-sm text-[var(--on-surface-variant)] mt-1">We found two duplicate streaming services. Consolidating could save you $120.00 annually.</p>
              </div>
              <button className="md:ml-auto whitespace-nowrap bg-[var(--on-surface)] text-[var(--surface)] py-2.5 px-6 rounded-full text-sm font-bold hover:scale-95 transition-transform shadow-md">
                Review Insights
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

