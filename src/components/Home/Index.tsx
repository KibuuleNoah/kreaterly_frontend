import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons-react";
import CampaignCard from "../CampaignCard";
import { useHome } from "../../hooks/useHome";

const Index = () => {
  const { setActiveCategory, activeCategory, campaigns } = useHome();
  return (
    <>
      {/* 2. STICKY SEARCH & FILTER BAR */}
      <div className="sticky top-0 z-50 bg-[#0B0E14]/80 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Main Search Input */}
            <div className="flex-1 relative group w-full">
              <IconSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search campaigns by brand, niche or product type..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-teal-500/30 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 font-medium"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 shrink-0">
                {["All", "TikTok", "Instagram", "UGC"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeCategory === cat
                        ? "bg-teal-500 text-black"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all shrink-0">
                <IconAdjustmentsHorizontal size={16} /> Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter mb-2 italic">
            MARKETPLACE
          </h1>
          <p className="text-gray-500 text-sm font-medium tracking-tight">
            Showing the latest high-payout opportunities for creators.
          </p>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Your CampaignCard components go here */}

          {campaigns.map((c, idx) => (
            <CampaignCard key={idx} campaign={c} />
          ))}
          {/* Skeletons for visual layout */}
          {/*Array.from({ length: 6 }).map((i) => (
            <CampaignSkeleton key={i} />
          ))*/}
        </div>
      </main>
    </>
  );
};

export default Index;
