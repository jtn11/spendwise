"use client";

import { Search, Filter, Plus, PiggyBank } from "lucide-react";

export default function SubscriptionsPage() {
  const openModal = () => {
    window.dispatchEvent(new CustomEvent("openAddModal"));
  };

  const subscriptions = [
    {
      id: "1",
      name: "Netflix Premium",
      category: "Entertainment • 4K UHD",
      cycle: "Monthly",
      date: "Oct 24, 2023",
      cost: "$19.99",
      status: "Active",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuComJI1kDcd930VXvzAenDfpxOCAAJFJ7XAOmqKzvpzL9RK7kt2nWDwWyXXoJ56PIA283veE5durrmSWgwT7VhFoDZ4ydVU3QU-yV5bH_WehW6dogTUv6xI_EIHfkwla-LE0OohtGhkTwW_H3g2yiz2t9MyQAjYAvBe9_P6v1iL55ApjR4xJzzes2ZB3JOG5bursf-pFGkkzn9wO7_dumFe9HfpLNXe9BgTo9sAzzUHWvQ4scC8Qkjv1XbbEtGQG1NDfzBz29lLIRQf"
    },
    {
      id: "2",
      name: "Creative Cloud",
      category: "Design & Creative • Full Suite",
      cycle: "Annual",
      date: "Jan 12, 2024",
      cost: "$54.99",
      status: "Active",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtuDA6OXldJVJ80Jl29zpsvpvOMxgV_I6jFZ-KIGL9AGFk7Lu30VDB1oMdG93N0FesXTNrlEWpbMbG424cdRPZEnuXYj3wk5jtNKS-sXW3cyIhWeVKVMzBQgswmhF9nMTTjgw2WGysRRDAhWwYlF27Qgxmh0VJmrhiXHl_vjqFKbfUzu9wKPXwlDd67nWvUK2jwgFUkFCz-nuctxJWsqgnQYzOphz4Hqqr_ZA-V0ft3c-W9JRIuNkGATv-nxzaYcH6USV8brQKAiov"
    },
    {
      id: "3",
      name: "Spotify Family",
      category: "Music • 6 Accounts",
      cycle: "Monthly",
      date: "Nov 02, 2023",
      cost: "$16.99",
      status: "Active",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTuaNmv2M4BnhVZkyCTPa_agcjcfDt5xyvZByZnR5KbPqxUq4iWGvB0RY8kg75MX1GNPempyHKQt9gb86WCmobdqoVc4ijV6iSyIs7BcdB-PBQxhFB85-JIZhT3Cg2IzesMxst06jDAsghTu6F4VSyYc94CSHYLK47Ftsjd_SMgtG_18UGcQsrgZA97FztZKsS5b0Hi8MU2m7h3fnis4PRjuea1azdgd-VXSlysEgN5MDeibJR5zGQOibIiUeP3TqhOu_SZ-ZJnmiC"
    },
    {
      id: "4",
      name: "Masterclass",
      category: "Education • Annual Plan",
      cycle: "Annual",
      date: "Next bill hidden",
      cost: "$15.00",
      status: "Paused",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrPj3Uw0Yi0nhy3BLzQ_Z0Y24Y6FMnoP2AywR41yl_odXJWKYhd1bdH9OdirE6brvzO2kvIibS-SXXXzCfwQ6u5j3tOVJegX0_GPlQYYACNNNE2zWxjI9EO_zu76AE-PMzGLXTpyXnMuWpt4j7sFreI-wkyQ21JyJLGO9o3n3zGY2WG_DYCVkAPptfFi_Y2tmTSRe9WbL1J4uuRXZbEANu6N3k8zESOqfAs48pWIhJ7ijEHfuQhz9JlXsPU3rnDjdTqkCKUXVOk_46"
    },
    {
      id: "5",
      name: "WSJ Digital",
      category: "News & Business • Global Access",
      cycle: "Monthly",
      date: "Oct 30, 2023",
      cost: "$38.99",
      status: "Action Required",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpcGbmDMNJtpdq6sntGB5B4IUbc8QpKmWZ4IsTyFHGFuRXRTwSmyxKn4krrOABe3isX374q07waU4csPQuM2Bch3wbl9gDwI2kqL_IA-dMGc12jEPBnQrXvhkhgqpX1I3itHOjTBHvLzfeEbp15ym-CbmN6vCMGWKNdvJgeB6dTc6cIr19NJkuWFbbAoldrj6lz8TN1LXOLoBS-TBnxdEmGBYTrJBkJPq4Nn5jMySMR04cpIgsMSn0qUzbUzALqz7JMpYYAMj_fVqu"
    }
  ];

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
            <p className="text-4xl font-display font-extrabold text-[var(--primary)]">$482.50</p>
          </div>
          <div className="h-12 w-px bg-[var(--outline-variant)]/30"></div>
          <div className="relative">
            <p className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mb-1">Active Now</p>
            <p className="text-4xl font-display font-extrabold text-[var(--secondary)]">14</p>
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
        {subscriptions.map((sub) => (
          <div key={sub.id} className={`grid grid-cols-12 gap-4 items-center px-8 py-5 rounded-xl transition-all group ${sub.status === 'Paused' ? 'bg-[var(--surface-container-low)]/50 shadow-sm opacity-80 grayscale hover:grayscale-0' : 'bg-[var(--surface-container-lowest)] shadow-sm hover:shadow-md'}`}>
            
            {/* Logo and Name */}
            <div className="col-span-12 md:col-span-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--surface-container)] flex items-center justify-center p-2 overflow-hidden shadow-sm">
                <img alt={sub.name} src={sub.logo} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-[var(--on-surface)] group-hover:text-[var(--primary)] transition-colors">{sub.name}</h3>
                <p className="text-xs text-[var(--on-surface-variant)]">{sub.category}</p>
              </div>
            </div>

            {/* Billing Cycle */}
            <div className="col-span-4 md:col-span-2 flex justify-center">
              <span className="text-xs font-bold text-[var(--on-surface-variant)] bg-[var(--surface-container)] px-3 py-1 rounded-full uppercase tracking-tighter">{sub.cycle}</span>
            </div>

            {/* Next Bill */}
            <div className="col-span-4 md:col-span-2">
              <p className={`text-sm font-medium ${sub.status === 'Paused' ? 'text-[var(--on-surface-variant)] italic' : 'text-[var(--on-surface)]'}`}>{sub.date}</p>
            </div>

            {/* Cost */}
            <div className="col-span-4 md:col-span-2 text-right">
              <p className={`text-xl font-display font-bold ${sub.status === 'Paused' ? 'text-[var(--on-surface-variant)]' : 'text-[var(--on-surface)]'}`}>{sub.cost}</p>
            </div>

            {/* Status Badge */}
            <div className="col-span-12 md:col-span-2 flex justify-end">
              {sub.status === "Active" && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-[var(--secondary-container)] text-[var(--on-secondary-container)] rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-[var(--secondary)] rounded-full animate-pulse"></span> Active
                </span>
              )}
              {sub.status === "Paused" && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-[var(--surface-container-highest)] text-[var(--on-surface-variant)] rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-[var(--on-surface-variant)] rounded-full"></span> Paused
                </span>
              )}
              {sub.status === "Action Required" && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-[var(--error-container)] text-[var(--on-error-container)] rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-[var(--error)] rounded-full"></span> Action Required
                </span>
              )}
            </div>
          </div>
        ))}
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
