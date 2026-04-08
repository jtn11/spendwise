"use client";

import { 
  Search, Bell, Settings, TrendingDown, PiggyBank, Copy, Clock, 
  TrendingUp, Film, Music, Cloud, Info, MonitorPlay, Briefcase, 
  Gamepad2, Box 
} from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="flex-1 p-6 md:p-10 max-w-[1600px] w-full mx-auto">
      {/* Page Header */}
      <div className="flex flex-col mb-10 mt-2">
        <h1 className="text-5xl font-display font-extrabold text-[var(--on-surface)] tracking-tight mb-2">Financial Intelligence</h1>
        <p className="text-[var(--on-surface-variant)] max-w-md">Detailed spending analysis & efficiency reports</p>
      </div>

      {/* Content Grid (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Primary Spend Chart (Asymmetric Large) */}
        <section className="md:col-span-8 bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-8 shadow-sm border border-[var(--outline-variant)]/20">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4">
            <div>
              <h3 className="text-sm font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mb-1">Total Annual Spend</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-display font-extrabold text-[var(--on-surface)]">$2,482.00</span>
                <span className="text-[var(--secondary)] font-bold text-sm flex items-center">
                  <TrendingDown className="w-4 h-4 mr-1" /> 12%
                </span>
              </div>
            </div>
            <div className="flex gap-2 bg-[var(--surface-container-low)] p-1.5 rounded-full">
              <button className="px-5 py-2 rounded-full text-xs font-bold bg-[var(--surface-container-lowest)] shadow-sm text-[var(--primary)] text-center transition-all">12M</button>
              <button className="px-5 py-2 rounded-full text-xs font-bold text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-lowest)]/50 transition-all text-center">6M</button>
              <button className="px-5 py-2 rounded-full text-xs font-bold text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-lowest)]/50 transition-all text-center">3M</button>
            </div>
          </div>
          
          {/* Mock Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-1 sm:gap-2 px-2 mt-4">
            <div className="w-full bg-[var(--surface-container)] rounded-t-xl sm:rounded-t-full h-1/2 relative group transition-all hover:h-[60%] cursor-crosshair">
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--inverse-surface)] text-[var(--inverse-on-surface)] text-[10px] px-2 py-1 rounded-md whitespace-nowrap shadow-md pointer-events-none transition-opacity">Jan: $180</div>
            </div>
            <div className="w-full bg-[var(--surface-container)] rounded-t-xl sm:rounded-t-full h-[55%] group transition-all hover:h-[65%]"></div>
            <div className="w-full bg-[var(--surface-container)] rounded-t-xl sm:rounded-t-full h-[45%] group transition-all hover:h-[55%]"></div>
            <div className="w-full bg-[var(--surface-container)] rounded-t-xl sm:rounded-t-full h-[60%] group transition-all hover:h-[70%]"></div>
            <div className="w-full bg-[var(--surface-container)] rounded-t-xl sm:rounded-t-full h-[65%] group transition-all hover:h-[75%]"></div>
            <div className="w-full bg-[var(--surface-container-highest)] rounded-t-xl sm:rounded-t-full h-[70%] group transition-all hover:h-[80%] border-x sm:border-x-4 border-[var(--surface-container-lowest)]"></div>
            <div className="w-full bg-[var(--primary)] rounded-t-xl sm:rounded-t-full h-[85%] border-b border-[var(--primary)] shadow-[0_0_15px_rgba(var(--primary),0.3)] shadow-[var(--primary)]/30 group transition-all hover:h-[95%] relative">
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--primary-container)] text-[var(--on-primary-container)] text-[10px] px-2 py-1 rounded-md font-bold shadow-md whitespace-nowrap">Jul: $280</div>
            </div>
            <div className="w-full bg-[var(--surface-container)] rounded-t-xl sm:rounded-t-full h-[75%] group transition-all hover:h-[85%]"></div>
            <div className="w-full bg-[var(--surface-container)] rounded-t-xl sm:rounded-t-full h-[60%] group transition-all hover:h-[70%]"></div>
            <div className="w-full bg-[var(--surface-container)] rounded-t-xl sm:rounded-t-full h-[50%] group transition-all hover:h-[60%]"></div>
            <div className="w-full bg-[var(--surface-container)] rounded-t-xl sm:rounded-t-full h-[40%] group transition-all hover:h-[50%]"></div>
            <div className="w-full bg-[var(--surface-container)] rounded-t-xl sm:rounded-t-full h-[35%] group transition-all hover:h-[45%]"></div>
          </div>
          <div className="flex justify-between mt-4 px-2">
            <span className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-wider">Jan</span>
            <span className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-wider">Apr</span>
            <span className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-wider">Jul</span>
            <span className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-wider">Oct</span>
            <span className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-wider">Dec</span>
          </div>
        </section>

        {/* Potential Savings (Stack Card) */}
        <section className="md:col-span-4 flex flex-col gap-6 h-full">
          <div className="bg-[var(--secondary-container)] rounded-[2.5rem] p-8 text-[var(--on-secondary-container)] relative overflow-hidden group shadow-sm flex-1 flex flex-col">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-[var(--surface-container-lowest)]/30 rounded-full blur-2xl group-hover:scale-[2] transition-transform duration-1000 ease-out pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-4">
              <PiggyBank className="w-6 h-6 text-[var(--secondary)]" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--on-secondary-container)]">Potential Savings</h3>
            </div>
            <div className="mb-6 border-b border-[var(--on-secondary-container)]/10 pb-6">
              <span className="text-5xl font-display font-extrabold block mb-1">$48.50</span>
              <span className="text-xs block font-bold opacity-80 uppercase tracking-wider">Monthly optimization possible</span>
            </div>
            
            <div className="space-y-4 mt-auto">
              <div className="bg-[var(--surface-container-lowest)]/50 backdrop-blur-md p-4 rounded-2xl flex justify-between items-center shadow-sm border border-[var(--surface-container-lowest)]/40 hover:bg-[var(--surface-container-lowest)]/60 transition-colors">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-[var(--surface-container-lowest)] rounded-xl flex items-center justify-center shadow-sm">
                    <Copy className="w-5 h-5 text-[var(--secondary)]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Duplicate Service</span>
                    <span className="text-xs opacity-70 font-medium">Hulu & Disney Bundle</span>
                  </div>
                </div>
                <span className="text-sm font-bold bg-[var(--surface-container-lowest)] px-2 py-1 rounded-lg">-$12.99</span>
              </div>
              
              <div className="bg-[var(--surface-container-lowest)]/50 backdrop-blur-md p-4 rounded-2xl flex justify-between items-center shadow-sm border border-[var(--surface-container-lowest)]/40 hover:bg-[var(--surface-container-lowest)]/60 transition-colors">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-[var(--surface-container-lowest)] rounded-xl flex items-center justify-center shadow-sm">
                    <Clock className="w-5 h-5 text-[var(--secondary)]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Rarely Used</span>
                    <span className="text-xs opacity-70 font-medium">Audible Premium</span>
                  </div>
                </div>
                <span className="text-sm font-bold bg-[var(--surface-container-lowest)] px-2 py-1 rounded-lg">-$14.95</span>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Price Increase Breakdown */}
        <section className="md:col-span-7 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)]/20 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex justify-between items-start mb-8 border-b border-[var(--outline-variant)]/20 pb-6">
            <div>
              <h3 className="text-2xl font-display font-extrabold text-[var(--on-surface)]">Inflation Impact</h3>
              <p className="text-sm text-[var(--on-surface-variant)] font-medium mt-1">Price changes across your portfolio (LTM)</p>
            </div>
            <div className="w-14 h-14 bg-[var(--error-container)] text-[var(--error)] rounded-2xl flex items-center justify-center shadow-sm transform -rotate-12 hover:rotate-0 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          
          <div className="space-y-3">
            {/* Item 1 */}
            <div className="bg-[var(--surface)] p-5 rounded-2xl flex items-center justify-between border-2 border-transparent hover:border-[var(--error)]/30 hover:bg-[var(--error-container)]/10 transition-all cursor-default">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--surface-container)] rounded-xl flex items-center justify-center shadow-sm">
                  <Film className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--on-surface)] text-base">Netflix Premium</h4>
                  <p className="text-[11px] text-[var(--on-surface-variant)] font-bold uppercase tracking-wider mt-0.5">Increased Oct 2023</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-display text-lg font-extrabold text-[var(--on-surface)]">$19.99 → $22.99</span>
                <span className="text-sm text-[var(--error)] font-bold inline-flex items-center gap-1 mt-0.5 bg-[var(--error-container)] px-2 py-0.5 rounded-md"><TrendingUp className="w-3 h-3"/> 15.0%</span>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className="bg-[var(--surface)] p-5 rounded-2xl flex items-center justify-between border-2 border-transparent hover:border-[var(--error)]/30 hover:bg-[var(--error-container)]/10 transition-all cursor-default">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--surface-container)] rounded-xl flex items-center justify-center shadow-sm">
                  <Music className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--on-surface)] text-base">Spotify Family</h4>
                  <p className="text-[11px] text-[var(--on-surface-variant)] font-bold uppercase tracking-wider mt-0.5">Increased Jul 2023</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-display text-lg font-extrabold text-[var(--on-surface)]">$15.99 → $16.99</span>
                <span className="text-sm text-[var(--error)] font-bold inline-flex items-center gap-1 mt-0.5 bg-[var(--error-container)] px-2 py-0.5 rounded-md"><TrendingUp className="w-3 h-3"/> 6.2%</span>
              </div>
            </div>
            
            {/* Item 3 */}
            <div className="bg-[var(--surface)] p-5 rounded-2xl flex items-center justify-between border-2 border-transparent hover:border-[var(--error)]/30 hover:bg-[var(--error-container)]/10 transition-all cursor-default">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--surface-container)] rounded-xl flex items-center justify-center shadow-sm">
                  <Cloud className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--on-surface)] text-base">Adobe Creative Cloud</h4>
                  <p className="text-[11px] text-[var(--on-surface-variant)] font-bold uppercase tracking-wider mt-0.5">Increased Nov 2023</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-display text-lg font-extrabold text-[var(--on-surface)]">$54.99 → $59.99</span>
                <span className="text-sm text-[var(--error)] font-bold inline-flex items-center gap-1 mt-0.5 bg-[var(--error-container)] px-2 py-0.5 rounded-md"><TrendingUp className="w-3 h-3"/> 9.1%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-5 bg-[var(--primary)]/5 rounded-2xl flex items-start gap-4 border border-[var(--primary)]/10">
            <Info className="w-6 h-6 text-[var(--primary)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed font-medium">Your total subscription costs have increased by <strong className="text-[var(--on-surface)] font-extrabold bg-[var(--surface-container-low)] px-1 rounded mx-0.5">$11.50/mo</strong> this year purely due to provider price hikes.</p>
          </div>
        </section>

        {/* Top Categories / Efficiency (Right Column) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Efficiency Metric */}
          <section className="bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-8 shadow-sm border border-[var(--outline-variant)]/20">
             <h3 className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mb-6 border-b border-[var(--outline-variant)]/20 pb-4">Spending Efficiency</h3>
             <div className="flex items-center gap-6">
               <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                 <svg className="w-full h-full -rotate-90">
                   <circle className="text-[var(--surface-container)]" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="12"></circle>
                   <circle className="text-[var(--primary)]" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="45.2" strokeWidth="12" strokeLinecap="round"></circle>
                 </svg>
                 <span className="absolute text-xl font-display font-extrabold text-[var(--on-surface)]">82%</span>
               </div>
               <div>
                 <p className="text-base font-bold text-[var(--primary)] mb-1">Top 5% of Users</p>
                 <p className="text-sm text-[var(--on-surface-variant)] font-medium leading-relaxed">Your spending to utility ratio is exceptionally high.</p>
               </div>
             </div>
          </section>

          {/* Categorical Breakdown */}
          <section className="bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-8 shadow-sm border border-[var(--outline-variant)]/20 flex-1">
            <h3 className="text-xl font-display font-extrabold text-[var(--on-surface)] mb-6">Categorical Breakdown</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--surface)] hover:bg-[var(--surface-container-low)] transition-colors p-5 rounded-3xl text-center border border-[var(--outline-variant)]/10 cursor-pointer">
                <MonitorPlay className="w-6 h-6 text-[var(--primary)] mx-auto mb-3" />
                <p className="text-[10px] uppercase font-bold text-[var(--on-surface-variant)] mb-1 tracking-wider">Streaming</p>
                <p className="text-xl font-display font-extrabold text-[var(--on-surface)]">$84.90</p>
              </div>
              <div className="bg-[var(--surface)] hover:bg-[var(--surface-container-low)] transition-colors p-5 rounded-3xl text-center border border-[var(--outline-variant)]/10 cursor-pointer">
                <Briefcase className="w-6 h-6 text-[var(--primary)] mx-auto mb-3" />
                <p className="text-[10px] uppercase font-bold text-[var(--on-surface-variant)] mb-1 tracking-wider">Product</p>
                <p className="text-xl font-display font-extrabold text-[var(--on-surface)]">$112.50</p>
              </div>
              <div className="bg-[var(--surface)] hover:bg-[var(--surface-container-low)] transition-colors p-5 rounded-3xl text-center border border-[var(--outline-variant)]/10 cursor-pointer">
                <Gamepad2 className="w-6 h-6 text-[var(--primary)] mx-auto mb-3" />
                <p className="text-[10px] uppercase font-bold text-[var(--on-surface-variant)] mb-1 tracking-wider">Gaming</p>
                <p className="text-xl font-display font-extrabold text-[var(--on-surface)]">$45.00</p>
              </div>
              <div className="bg-[var(--surface)] hover:bg-[var(--surface-container-low)] transition-colors p-5 rounded-3xl text-center border border-[var(--outline-variant)]/10 cursor-pointer">
                <Box className="w-6 h-6 text-[var(--primary)] mx-auto mb-3" />
                <p className="text-[10px] uppercase font-bold text-[var(--on-surface-variant)] mb-1 tracking-wider">Storage</p>
                <p className="text-xl font-display font-extrabold text-[var(--on-surface)]">$12.99</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[var(--outline-variant)]/20">
              <div className="flex justify-between text-xs font-bold mb-3 items-center">
                <span className="text-[var(--on-surface-variant)] uppercase tracking-wider">Usage Health</span>
                <span className="text-[var(--secondary)] bg-[var(--secondary-container)] px-2 py-1 rounded-md">Excellent</span>
              </div>
              <div className="h-2.5 w-full bg-[var(--surface-container-high)] rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-[var(--secondary)] w-[88%] rounded-full shadow-[0_0_10px_rgba(var(--secondary),0.5)]"></div>
              </div>
              <p className="text-xs text-[var(--on-surface-variant)] mt-4 text-center font-medium">You actively use <strong className="text-[var(--on-surface)]">14</strong> of <strong className="text-[var(--on-surface)]">16</strong> subscriptions weekly.</p>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
}
