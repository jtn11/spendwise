"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, List, PieChart, LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--color-border)] bg-[var(--color-card)] flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-[var(--color-brand)] flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              S
            </span>
            SpendWise
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-[var(--foreground)] bg-[var(--color-background)] rounded-lg">
            <LayoutDashboard className="w-5 h-5 text-[var(--color-brand)]" />
            Dashboard
          </Link>
          <Link href="/subscriptions" className="flex items-center gap-3 px-3 py-2 text-[var(--color-muted)] hover:bg-[var(--color-background)] hover:text-[var(--foreground)] rounded-lg transition-colors">
            <List className="w-5 h-5" />
            Subscriptions
          </Link>
          <Link href="/insights" className="flex items-center gap-3 px-3 py-2 text-[var(--color-muted)] hover:bg-[var(--color-background)] hover:text-[var(--foreground)] rounded-lg transition-colors">
            <PieChart className="w-5 h-5" />
            Insights
          </Link>
        </nav>
        
        <div className="p-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--foreground)] mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              {user.displayName?.[0] || user.email?.[0] || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium">{user.displayName || "User"}</p>
              <p className="truncate text-xs text-[var(--color-muted)]">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={() => {
              logOut();
              router.push("/login");
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-[var(--color-border)] bg-[var(--color-card)] flex items-center px-8 sticky top-0 z-10">
          <h2 className="text-sm font-medium text-[var(--color-muted)]">Overview</h2>
        </header>
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
