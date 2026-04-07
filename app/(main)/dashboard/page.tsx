import { TrendingDown, PlayCircle, Cloud, Briefcase, PiggyBank } from "lucide-react";

export default function DashboardPage() {
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
              $428.50
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
              <p className="text-xl font-bold mt-1">14 Active</p>
            </div>
            <div className="flex-shrink-0 bg-[var(--surface-container-low)] px-6 py-4 rounded-xl min-w-[140px]">
              <p className="text-xs text-[var(--on-surface-variant)] font-medium">Auto-renew</p>
              <p className="text-xl font-bold mt-1">11 Items</p>
            </div>
            <div className="flex-shrink-0 bg-[var(--surface-container-low)] px-6 py-4 rounded-xl min-w-[140px]">
              <p className="text-xs text-[var(--on-surface-variant)] font-medium">Yearly Savings</p>
              <p className="text-xl font-bold text-[var(--secondary)] mt-1">$1,240</p>
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
              <circle className="text-[var(--primary)]" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="150" strokeWidth="20"></circle>
              <circle className="text-[var(--secondary)]" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="380" strokeWidth="20"></circle>
              <circle className="text-[#006976]" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="450" strokeWidth="20"></circle>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black font-display text-[var(--on-surface)]">60%</span>
              <span className="text-[10px] uppercase font-bold text-[var(--on-surface-variant)]">Entertainment</span>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-1.5 text-[var(--on-surface)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]"></div>
              <span className="text-xs font-medium">Streaming</span>
            </div>
            <div className="flex items-center gap-1.5 text-[var(--on-surface)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--secondary)]"></div>
              <span className="text-xs font-medium">Health</span>
            </div>
            <div className="flex items-center gap-1.5 text-[var(--on-surface)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#006976]"></div>
              <span className="text-xs font-medium">Work</span>
            </div>
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
            {/* Upcoming Item 1 */}
            <div className="bg-[var(--surface-container-lowest)] p-5 rounded-xl flex items-center justify-between group hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1e333c] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-[var(--on-surface)]">Netflix Premium</h4>
                  <p className="text-xs text-[var(--on-surface-variant)]">Billed on Oct 12</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-sm text-[var(--on-surface)]">$19.99</p>
                <span className="inline-block px-2 py-0.5 bg-[var(--error-container)] text-[var(--on-error-container)] text-[10px] font-bold rounded-full mt-1">Due in 2 days</span>
              </div>
            </div>

            {/* Upcoming Item 2 */}
            <div className="bg-[var(--surface-container-lowest)] p-5 rounded-xl flex items-center justify-between group hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#cfe6f2] flex items-center justify-center text-[var(--primary)] shadow-sm group-hover:scale-105 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-[var(--on-surface)]">Peloton All-Access</h4>
                  <p className="text-xs text-[var(--on-surface-variant)]">Billed on Oct 15</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-sm text-[var(--on-surface)]">$44.00</p>
                <span className="inline-block px-2 py-0.5 bg-[var(--secondary-container)] text-[var(--on-secondary-container)] text-[10px] font-bold rounded-full mt-1">Due in 5 days</span>
              </div>
            </div>

            {/* Upcoming Item 3 */}
            <div className="bg-[var(--surface-container-lowest)] p-5 rounded-xl flex items-center justify-between group hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#004f5a] flex items-center justify-center text-[#9eefff] shadow-sm group-hover:scale-105 transition-transform">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-[var(--on-surface)]">Adobe Creative Cloud</h4>
                  <p className="text-xs text-[var(--on-surface-variant)]">Billed on Oct 18</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-sm text-[var(--on-surface)]">$54.99</p>
                <span className="inline-block px-2 py-0.5 bg-[var(--secondary-container)] text-[var(--on-secondary-container)] text-[10px] font-bold rounded-full mt-1">Auto-renew</span>
              </div>
            </div>
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
