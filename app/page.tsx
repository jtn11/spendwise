"use client";

import Link from "next/link";
import { ArrowRight, Wallet, PieChart, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-card)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
            S
          </div>
          <span className="font-bold text-xl text-[var(--foreground)] tracking-tight">SpendWise</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--foreground)] transition-colors">
            Log in
          </Link>
          <Link href="/signup" className="text-sm font-medium bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white px-4 py-2 rounded-lg transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--foreground)] tracking-tight">
            Stop paying for <span className="text-[var(--color-brand)]">subscriptions</span> you don't use.
          </h1>
          <p className="text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
            SpendWise gives you a clear dashboard of all your recurring expenses, alerts you before renewals, and helps you make smarter financial decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/signup" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-lg font-medium px-8 py-4 rounded-xl transition-colors shadow-lg shadow-emerald-500/25">
              Start Saving Money
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-background)] text-[var(--foreground)] text-lg font-medium px-8 py-4 rounded-xl transition-colors">
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mt-32 text-left">
          <div className="bg-[var(--color-card)] p-8 rounded-2xl border border-[var(--color-border)]">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
              <Wallet className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">Centralized Tracking</h3>
            <p className="text-[var(--color-muted)] leading-relaxed">
              View all your recurring expenses in one place. Never lose track of where your money goes every month.
            </p>
          </div>
          
          <div className="bg-[var(--color-card)] p-8 rounded-2xl border border-[var(--color-border)]">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">Timely Alerts</h3>
            <p className="text-[var(--color-muted)] leading-relaxed">
              Get notified before you get charged. Cancel unwanted tools in time and avoid the frustration of surprise renewals.
            </p>
          </div>

          <div className="bg-[var(--color-card)] p-8 rounded-2xl border border-[var(--color-border)]">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
              <PieChart className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">Smart Insights</h3>
            <p className="text-[var(--color-muted)] leading-relaxed">
              Understand your spending habits by categories. Identify expensive outliers and optimize your budget effortlessly.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
