import Link from "next/link";
import { ArrowRight, Wallet, PieChart, Lock, BellRing } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)] flex flex-col font-sans selection:bg-[var(--primary-container)] selection:text-[var(--on-primary)] overflow-hidden relative">
      
      {/* Ambient Glassmorphism Background Blurs */}
      <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-[var(--primary)] text-transparent rounded-full opacity-[0.06] blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--secondary)] text-transparent rounded-full opacity-[0.06] blur-[100px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[var(--surface-container)] flex items-center justify-center text-[var(--primary)] shadow-sm border border-[var(--outline-variant)]/20">
            <Lock className="w-5 h-5 fill-current" />
          </div>
          <span className="font-extrabold text-2xl text-[var(--on-surface)] tracking-tight">SpendWise</span>
          <span className="hidden sm:inline-block ml-3 px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] rounded-full">
            The Digital Vault
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-bold text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">
            Log in
          </Link>
          <Link href="/signup" className="text-sm font-bold bg-[var(--surface-container-lowest)] hover:bg-[var(--surface-container)] text-[var(--primary)] px-6 py-3 rounded-full transition-all shadow-sm border border-[var(--outline-variant)]/20 hover:shadow-md">
             Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative z-10">
        <div className="max-w-4xl flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--secondary-container)]/50 border border-[var(--secondary-container)] text-[var(--on-secondary-container)] text-[11px] font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse"></span>
            Your Financial Concierge
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-[var(--on-surface)] tracking-tighter leading-[1.05] mb-8">
            Stop paying for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)]">subscriptions</span> you don't use.
          </h1>
          
          <p className="text-lg md:text-2xl text-[var(--on-surface-variant)] max-w-2xl leading-relaxed font-medium mb-12">
            SpendWise gives you a clear dashboard of all your recurring expenses, alerts you before renewals, and helps you make smarter financial decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
            <Link href="/signup" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] text-[var(--on-primary)] text-lg font-bold px-10 py-4.5 rounded-full transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_12px_24px_-8px_var(--primary)]">
              Start Saving Money
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[var(--surface-container-lowest)] text-[var(--on-surface)] text-lg font-bold px-10 py-4.5 rounded-full transition-all hover:bg-[var(--surface-container-low)] shadow-sm">
              Explore Dashboard
            </Link>
          </div>
        </div>

        {/* Features Grid - Asymmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mt-32 text-left w-full mx-auto px-4 md:px-0">
          
          {/* Card 1 */}
          <div className="bg-[var(--surface-container-lowest)] p-10 rounded-[32px] hover:bg-[var(--surface-container-low)] transition-colors duration-300">
            <div className="w-14 h-14 bg-[var(--surface-container)] rounded-2xl flex items-center justify-center mb-8 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] border border-[var(--outline-variant)]/10">
              <Wallet className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <h3 className="text-2xl font-extrabold text-[var(--on-surface)] mb-4 tracking-tight">Centralized Tracking</h3>
            <p className="text-[var(--on-surface-variant)] text-base leading-relaxed font-medium">
              View all your recurring expenses in one place. Never lose track of where your money goes every month.
            </p>
          </div>
          
          {/* Card 2 - Elevated / Hero Card styling */}
          <div className="bg-[var(--surface-container-lowest)] p-10 rounded-[32px] md:-translate-y-6 hover:bg-[var(--surface-container-low)] transition-colors duration-300 shadow-[0_20px_40px_-12px_rgba(0,40,90,0.06)] relative border border-[var(--outline-variant)]/5">
            <div className="absolute top-0 right-12 w-20 h-1.5 bg-[var(--secondary)] rounded-b-full"></div>
            <div className="w-14 h-14 bg-[var(--secondary-container)] rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <BellRing className="w-6 h-6 text-[var(--on-secondary-container)]" />
            </div>
            <h3 className="text-2xl font-extrabold text-[var(--on-surface)] mb-4 tracking-tight">Timely Alerts</h3>
            <p className="text-[var(--on-surface-variant)] text-base leading-relaxed font-medium">
              Get notified before you get charged. Cancel unwanted tools in time and avoid the frustration of surprise renewals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[var(--surface-container-lowest)] p-10 rounded-[32px] hover:bg-[var(--surface-container-low)] transition-colors duration-300">
            <div className="w-14 h-14 bg-[var(--surface-container)] rounded-2xl flex items-center justify-center mb-8 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] border border-[var(--outline-variant)]/10">
              <PieChart className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <h3 className="text-2xl font-extrabold text-[var(--on-surface)] mb-4 tracking-tight">Smart Insights</h3>
            <p className="text-[var(--on-surface-variant)] text-base leading-relaxed font-medium">
              Understand your spending habits by categories. Identify expensive outliers and optimize your budget effortlessly.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
