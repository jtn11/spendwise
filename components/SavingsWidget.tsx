"use client";

import { useState, useEffect } from "react";
import { 
  PiggyBank, Settings, Check, X, Clock, 
  HelpCircle, ChevronDown, ChevronUp, AlertTriangle, 
  Calendar, ShieldCheck, DollarSign
} from "lucide-react";
import type { Subscription } from "@/lib/types";

interface SavingsWidgetProps {
  subscriptions: Subscription[];
  onActionCompleted: () => void;
}

export default function SavingsWidget({ subscriptions, onActionCompleted }: SavingsWidgetProps) {
  // Configurable thresholds (stored in localStorage or state)
  const [costThreshold, setCostThreshold] = useState<number>(300); // default ₹300 per month
  const [alertHorizonDays, setAlertHorizonDays] = useState<number>(7); // default 7 days
  const [currencySymbol, setCurrencySymbol] = useState<string>("₹"); // default Rupees
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Load user threshold settings from localStorage if available
  useEffect(() => {
    const savedThreshold = localStorage.getItem("savings_cost_threshold");
    const savedHorizon = localStorage.getItem("savings_alert_horizon");
    const savedCurrency = localStorage.getItem("savings_currency");
    
    if (savedThreshold) setCostThreshold(parseFloat(savedThreshold));
    if (savedHorizon) setAlertHorizonDays(parseInt(savedHorizon));
    if (savedCurrency) setCurrencySymbol(savedCurrency);
  }, []);

  const saveSettings = (newThreshold: number, newHorizon: number, newCurrency: string) => {
    setCostThreshold(newThreshold);
    setAlertHorizonDays(newHorizon);
    setCurrencySymbol(newCurrency);
    
    localStorage.setItem("savings_cost_threshold", newThreshold.toString());
    localStorage.setItem("savings_alert_horizon", newHorizon.toString());
    localStorage.setItem("savings_currency", newCurrency);
  };

  const getMonthlyEquivalent = (sub: Subscription): number => {
    if (sub.billingCycle === "Monthly") return sub.price;
    if (sub.billingCycle === "Weekly") return sub.price * 4.33; // average weeks in month
    if (sub.billingCycle === "Yearly") return sub.price / 12;
    return sub.price;
  };

  const getYearlyEquivalent = (sub: Subscription): number => {
    if (sub.billingCycle === "Monthly") return sub.price * 12;
    if (sub.billingCycle === "Weekly") return sub.price * 52;
    if (sub.billingCycle === "Yearly") return sub.price;
    return sub.price * 12;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Core flagging logic
  const flaggedSubscriptions = subscriptions.filter(sub => {
    // Only flag active auto-renewing subscriptions
    if (!sub.autoRenew) return false;

    // Check if the user has reviewed this recently (within the last 30 days)
    if (sub.reviewedAt) {
      const lastReviewedDate = new Date(sub.reviewedAt);
      const daysSinceReview = (today.getTime() - lastReviewedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceReview < 30 && sub.reviewAction === "keep") {
        return false; // Skip if kept within 30 days
      }
    }

    // Check if currently snoozed ("remind later")
    if (sub.remindLaterUntil) {
      const remindDate = new Date(sub.remindLaterUntil);
      if (today < remindDate) {
        return false; // Skip if snooze is still active
      }
    }

    // Check cost threshold
    const monthlyCost = getMonthlyEquivalent(sub);
    const costIsAboveThreshold = monthlyCost >= costThreshold;

    // Check renewal closeness
    let renewalIsNear = false;
    let diffDays = -1;
    if (sub.nextBillingDate) {
      const billingDate = new Date(sub.nextBillingDate);
      const diffTime = billingDate.getTime() - today.getTime();
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      renewalIsNear = diffDays >= 0 && diffDays <= alertHorizonDays;
    }

    // Check if never reviewed (not reviewed recently)
    const hasNotBeenReviewedRecently = !sub.reviewedAt;

    // Flag subscription if it exceeds cost threshold, OR renewal is near, OR never reviewed
    return costIsAboveThreshold || renewalIsNear || hasNotBeenReviewedRecently;
  });

  // Calculate potential yearly savings by summing yearly costs of flagged items
  const potentialSavingsYearly = flaggedSubscriptions.reduce((acc, sub) => {
    return acc + getYearlyEquivalent(sub);
  }, 0);

  // Handles review actions (Keep, Cancel, Remind Me Later)
  const handleReviewAction = async (sub: Subscription, action: "keep" | "cancel" | "remind_later") => {
    if (!sub.id) return;
    setProcessingId(sub.id);

    try {
      let body: any = {
        name: sub.name,
        price: sub.price,
        billingCycle: sub.billingCycle,
        category: sub.category,
        nextBillingDate: sub.nextBillingDate,
        autoRenew: sub.autoRenew,
        reviewedAt: new Date().toISOString(),
        reviewAction: action
      };

      if (action === "cancel") {
        body.autoRenew = false; // Disable auto-renewal
      } else if (action === "remind_later") {
        // Snooze for 7 days
        const snoozeDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        body.remindLaterUntil = snoozeDate.toISOString();
      }

      const response = await fetch(`/api/subscriptions/${sub.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error("Failed to update subscription");
      }

      // Notify parent to refresh subscription list
      onActionCompleted();
    } catch (error) {
      console.error("Error executing review action:", error);
      alert("Failed to save action. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  // Helper to determine reasons a subscription was flagged
  const getFlagReasons = (sub: Subscription) => {
    const reasons = [];
    const monthlyCost = getMonthlyEquivalent(sub);
    
    if (monthlyCost >= costThreshold) {
      reasons.push({
        text: `High Cost (${currencySymbol}${monthlyCost.toFixed(0)}/mo)`,
        desc: `Exceeds your ${currencySymbol}${costThreshold}/mo threshold`
      });
    }
    
    if (sub.nextBillingDate) {
      const billingDate = new Date(sub.nextBillingDate);
      const diffTime = billingDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays >= 0 && diffDays <= alertHorizonDays) {
        reasons.push({
          text: `Renews in ${diffDays} day${diffDays === 1 ? "" : "s"}`,
          desc: `Billing date: ${billingDate.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}`
        });
      }
    }
    
    if (!sub.reviewedAt) {
      reasons.push({
        text: "Not Reviewed Recently",
        desc: "Has not been audit-checked in the Vault"
      });
    }

    return reasons;
  };

  return (
    <div className="bg-gradient-to-br from-[var(--surface-container-low)]/80 to-[var(--surface-container-high)]/90 border border-white/20 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all duration-300">
      {/* Decorative Blur Background element */}
      <div className="absolute -right-6 -top-6 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Widget Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center shadow-inner">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-extrabold text-lg text-[var(--on-surface)]">Savings Engine</h4>
            <p className="text-xs text-[var(--on-surface-variant)]">Automated Subscription Auditing</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`p-2.5 rounded-full text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-lowest)] transition-all ${isSettingsOpen ? 'bg-[var(--primary)]/10 text-[var(--primary)] rotate-90' : 'hover:scale-105'}`}
          title="Auditor Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Settings Drawer Slider */}
      {isSettingsOpen && (
        <div className="mb-6 p-5 bg-[var(--surface-container-lowest)]/80 rounded-2xl border border-[var(--outline-variant)]/20 animate-in slide-in-from-top-4 duration-300">
          <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--on-surface)] mb-4 flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5" /> Threshold Configuration
          </h5>
          
          <div className="space-y-4">
            {/* Currency settings */}
            <div>
              <label className="block text-[11px] font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">Currency Symbol</label>
              <div className="flex gap-2">
                {["₹", "$", "€"].map(curr => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => saveSettings(costThreshold, alertHorizonDays, curr)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${currencySymbol === curr ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-sm' : 'border-[var(--outline-variant)] text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)]'}`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[var(--on-surface-variant)] mb-2">
                <span>Cost Alert Threshold</span>
                <span className="text-[var(--primary)]">{currencySymbol}{costThreshold}/mo</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="5000" 
                step="50"
                value={costThreshold}
                onChange={(e) => saveSettings(parseFloat(e.target.value), alertHorizonDays, currencySymbol)}
                className="w-full h-1.5 bg-[var(--surface-container-high)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
              <div className="flex justify-between text-[9px] text-[var(--on-surface-variant)]/70 font-medium mt-1">
                <span>{currencySymbol}50</span>
                <span>{currencySymbol}2,500</span>
                <span>{currencySymbol}5,000</span>
              </div>
            </div>

            {/* Alert Horizon days slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[var(--on-surface-variant)] mb-2">
                <span>Renewal Warning Window</span>
                <span className="text-[var(--primary)]">{alertHorizonDays} Days</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                step="1"
                value={alertHorizonDays}
                onChange={(e) => saveSettings(costThreshold, parseInt(e.target.value), currencySymbol)}
                className="w-full h-1.5 bg-[var(--surface-container-high)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
              <div className="flex justify-between text-[9px] text-[var(--on-surface-variant)]/70 font-medium mt-1">
                <span>1 Day</span>
                <span>15 Days</span>
                <span>30 Days</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Primary Potential Savings Aggregator */}
      <div className="bg-[var(--surface-container-lowest)] p-5 rounded-[2rem] shadow-sm mb-6 flex items-center justify-between border border-white/30 relative overflow-hidden group">
        <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-[var(--secondary)]/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--on-surface-variant)] block">
            Potential Savings
          </span>
          <span className="text-3xl font-display font-extrabold text-[var(--secondary)] mt-1 block tracking-tight transition-all animate-pulse">
            {currencySymbol}{potentialSavingsYearly.toLocaleString("en-IN")}/year
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--on-surface-variant)] block">
            Flagged Items
          </span>
          <span className="text-2xl font-display font-bold text-[var(--on-surface)] mt-1 block">
            {flaggedSubscriptions.length}
          </span>
        </div>
      </div>

      {/* Flagged Subscriptions List */}
      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 hidden-scrollbar">
        {flaggedSubscriptions.length === 0 ? (
          <div className="py-8 px-4 text-center bg-[var(--surface-container-lowest)]/50 border border-dashed border-[var(--outline-variant)]/40 rounded-2xl flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[var(--secondary-container)] text-[var(--secondary)] flex items-center justify-center shadow-md mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h5 className="font-display font-bold text-sm text-[var(--on-surface)]">Audit Clean!</h5>
            <p className="text-[11px] text-[var(--on-surface-variant)] mt-1 max-w-[200px] leading-relaxed">
              All subscriptions are optimized according to your filters. Excellent management!
            </p>
          </div>
        ) : (
          flaggedSubscriptions.map(sub => {
            const reasons = getFlagReasons(sub);
            const isProcessing = processingId === sub.id;

            return (
              <div 
                key={sub.id} 
                className="bg-[var(--surface-container-lowest)] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between border border-[var(--outline-variant)]/10 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                {/* Loader Overlay when saving */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10 transition-opacity">
                    <div className="w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Sub Metadata Info */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface-container)] flex items-center justify-center text-[var(--primary)] font-bold text-base shrink-0 select-none shadow-sm uppercase">
                    {sub.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-sans font-bold text-sm text-[var(--on-surface)] truncate">{sub.name}</h5>
                      <span className="text-[10px] font-bold text-[var(--on-surface-variant)] bg-[var(--surface-container-low)] px-1.5 py-0.5 rounded uppercase">
                        {sub.billingCycle}
                      </span>
                    </div>
                    
                    <p className="text-xs text-[var(--on-surface-variant)] font-semibold mt-0.5">
                      {currencySymbol}{sub.price.toFixed(2)}
                    </p>

                    {/* Flagged Reasons Tag Badges */}
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {reasons.map((r, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded bg-[var(--error-container)]/10 text-[var(--error)] border border-[var(--error-container)]/20"
                          title={r.desc}
                        >
                          <AlertTriangle className="w-2.5 h-2.5" />
                          {r.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex items-center gap-2 mt-4 sm:mt-0 sm:ml-4 self-end sm:self-center shrink-0">
                  {/* Remind Later (Snooze) */}
                  <button
                    onClick={() => handleReviewAction(sub, "remind_later")}
                    disabled={!!processingId}
                    className="p-2.5 rounded-xl border border-[var(--outline-variant)] text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] hover:text-amber-600 transition-colors disabled:opacity-50"
                    title="Remind Me Later"
                  >
                    <Clock className="w-4 h-4" />
                  </button>

                  {/* Keep (Audit OK) */}
                  <button
                    onClick={() => handleReviewAction(sub, "keep")}
                    disabled={!!processingId}
                    className="p-2.5 rounded-xl border border-[var(--outline-variant)] text-[var(--on-surface-variant)] hover:bg-[var(--secondary-container)] hover:text-[var(--secondary)] transition-colors disabled:opacity-50"
                    title="Keep Subscription"
                  >
                    <Check className="w-4 h-4" />
                  </button>

                  {/* Cancel (Stop Bill) */}
                  <button
                    onClick={() => handleReviewAction(sub, "cancel")}
                    disabled={!!processingId}
                    className="p-2.5 rounded-xl border border-[var(--error-container)] text-[var(--error)] hover:bg-[var(--error-container)]/20 transition-colors disabled:opacity-50"
                    title="Cancel Subscription"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
