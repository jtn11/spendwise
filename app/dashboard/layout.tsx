"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, List, PieChart, BarChart3, Plus, Search, Bell, Settings, LogOut } from "lucide-react";
import AddSubscriptionModal from "@/components/AddSubscriptionModal";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { loading, logOut } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push("/login");
  //   }
  // }, [user, loading, router]);

  // if (loading || !user) {
  //   return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  // }SOME 

  const user = {
    displayName: "Phoenix",
    email: "[EMAIL_ADDRESS]"
  };

  return (
    <div className="bg-[var(--surface)] text-[var(--on-surface)] min-h-screen font-sans selection:bg-[var(--primary-container)] selection:text-[var(--on-primary)]">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-[var(--surface)] p-4 gap-2 shadow-xl shadow-[var(--on-surface)]/5 z-[100]">
        <div className="mb-8 px-4 py-2">
          <h1 className="font-display font-extrabold text-[var(--primary)] text-2xl tracking-tight">The Vault</h1>
          <p className="text-xs text-[var(--on-surface-variant)] font-medium">Financial Concierge</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto hidden-scrollbar">
          {/* Active Item */}
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[var(--surface-container)] text-[var(--primary)] rounded-full font-semibold transition-all translate-x-1">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/subscriptions" className="flex items-center gap-3 px-4 py-3 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)]/50 rounded-full transition-all">
            <List className="w-5 h-5" />
            <span className="text-sm">Subscriptions</span>
          </Link>
          <Link href="/insights" className="flex items-center gap-3 px-4 py-3 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)]/50 rounded-full transition-all">
            <PieChart className="w-5 h-5" />
            <span className="text-sm">Insights</span>
          </Link>
          <Link href="/reports" className="flex items-center gap-3 px-4 py-3 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)]/50 rounded-full transition-all">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm">Reports</span>
          </Link>
        </nav>
        
        <div className="mt-auto p-4 space-y-3">
          <button 
            onClick={() => { logOut(); router.push("/login"); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium text-[var(--on-surface-variant)] hover:bg-[var(--error-container)] hover:text-[var(--on-error)] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] text-[var(--on-primary)] py-3 rounded-full font-bold shadow-lg shadow-[var(--primary)]/20 hover:scale-95 transition-transform">
            <Plus className="w-5 h-5" />
            <span>Add New</span>
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="md:ml-64 min-h-screen pb-20 md:pb-0 relative">
        {/* TopNavBar */}
        <header className="w-full sticky top-0 z-40 bg-[var(--surface)] flex justify-between items-center px-6 py-4">
          <div className="flex flex-col">
            <h2 className="font-display font-bold text-lg text-[var(--primary)]">Financial Overview</h2>
            <p className="text-xs text-[var(--on-surface-variant)]">Welcome back{user.displayName ? `, ${user.displayName}` : ''}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--outline)]" />
              <input 
                className="bg-[var(--surface-container-low)] border-none rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 w-64 text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)]/70" 
                placeholder="Search services..." 
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] rounded-full transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] rounded-full transition-colors hidden sm:block">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 ml-2 rounded-full border-2 border-[var(--surface-container-highest)] bg-[var(--primary-container)] text-[var(--on-primary)] flex items-center justify-center font-bold font-display shadow-sm uppercase">
                {user.displayName?.[0] || user.email?.[0] || "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content gets injected here */}
        {children}
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 px-6 py-3 flex justify-between items-center z-50 backdrop-blur-xl bg-[var(--surface)]/80 border-t border-[var(--outline-variant)]/15">
        <Link className="flex flex-col items-center gap-1 text-[var(--primary)]" href="/dashboard">
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold">Dashboard</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-[var(--on-surface-variant)]" href="/subscriptions">
          <List className="w-6 h-6" />
          <span className="text-[10px] font-bold">Subs</span>
        </Link>
        
        {/* Floating Action Button for Mobile */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="-mt-12 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] w-14 h-14 rounded-full flex items-center justify-center text-[var(--on-primary)] shadow-2xl shadow-[var(--primary)]/40">
          <Plus className="w-8 h-8" />
        </button>
        
        <Link className="flex flex-col items-center gap-1 text-[var(--on-surface-variant)]" href="/insights">
          <PieChart className="w-6 h-6" />
          <span className="text-[10px] font-bold">Insights</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-[var(--on-surface-variant)]" href="/profile">
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-bold">Settings</span>
        </Link>
      </nav>

      {/* FAB for Desktop (Contextual) */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="hidden md:flex fixed bottom-8 right-8 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] text-[var(--on-primary)] p-4 rounded-full shadow-2xl shadow-[var(--primary)]/30 items-center gap-3 hover:scale-105 transition-transform group z-50">
        <Plus className="w-5 h-5" />
        <span className="font-bold text-sm pr-2">Add New Subscription</span>
      </button>

      <AddSubscriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
