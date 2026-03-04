import React from "react";
import {
  IconChevronLeft,
  IconUsers,
  IconChartBar,
  IconTarget,
  IconCalendar,
  IconCheck,
  IconAlertCircle,
  IconTrophy,
  IconBrandTiktok,
  IconArrowRight,
} from "@tabler/icons-react";

const CampaignDetail: React.FC<{ campaign: any }> = ({ campaign }) => {
  // Logic for analytics preview
  const utilization = (6400000 / campaign.budget) * 100; // Mocked real-time math

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white font-sans">
      {/* 1. Header Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-teal-500 transition-colors text-xs font-black uppercase tracking-widest"
        >
          <IconChevronLeft size={20} /> Back to Marketplace
        </button>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">
            ID: {campaign.id}
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
        {/* LEFT COLUMN: CONTENT & ANALYTICS (8 Cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Brand & Title Hero */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={campaign.expand?.brand_id?.logo}
                alt="brand"
                className="w-16 h-16 rounded-2xl border border-white/10 object-cover"
              />
              <div>
                <p className="text-teal-500 text-xs font-black uppercase tracking-[0.2em]">
                  {campaign.expand?.brand_id?.name}
                </p>
                <h1 className="text-4xl font-black italic tracking-tighter uppercase">
                  {campaign.title}
                </h1>
              </div>
            </div>

            {/* Visual Teaser */}
            <div className="aspect-video w-full rounded-[40px] overflow-hidden border border-white/5 relative group">
              <img
                src="https://images.unsplash.com"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="bg-teal-500 text-black px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]">
                  Official Campaign
                </span>
              </div>
            </div>
          </section>

          {/* Real-time Analytics Preview */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnalyticTile
              label="Total Reach"
              value="1.2M+"
              icon={<IconChartBar size={18} />}
            />
            <AnalyticTile
              label="Target Gender"
              value={campaign.gender}
              icon={<IconUsers size={18} />}
            />
            <AnalyticTile
              label="Min. Subs"
              value="2.4k"
              icon={<IconTarget size={18} />}
            />
            <AnalyticTile
              label="Days Left"
              value="14"
              icon={<IconCalendar size={18} />}
            />
          </section>

          {/* Description & Requirements */}
          <section className="space-y-8 bg-white/[0.02] border border-white/5 p-8 rounded-[32px]">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-4">
                Brief & Objectives
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {campaign.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-teal-500 mb-4 flex items-center gap-2">
                  <IconCheck size={16} /> Requirements
                </h3>
                <ul className="space-y-3">
                  {[
                    "High quality 4K video",
                    "Luganda or English",
                    "2x TikTok Posts",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-xs font-bold text-gray-300 flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-teal-500 rounded-full" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-4 flex items-center gap-2">
                  <IconAlertCircle size={16} /> Exclusions
                </h3>
                <p className="text-[11px] text-gray-500 font-medium leading-loose">
                  No competing brands in frame. No profanity. Content must be
                  original.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: STICKY ACTIONS (4 Cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            {/* Payout Card */}
            <div className="bg-[#11141A] border border-white/10 rounded-[32px] p-8 shadow-2xl space-y-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">
                  Estimated Payout
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white italic">
                    UGX {campaign.cpm.toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                    / 1k Views
                  </span>
                </div>
              </div>

              {/* Progress Detail */}
              <div className="space-y-3 p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                  <span className="text-gray-500">Campaign Utilization</span>
                  <span className="text-teal-500">
                    {utilization.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all duration-1000"
                    style={{ width: `${utilization}%` }}
                  />
                </div>
                <p className="text-[9px] text-gray-600 font-bold leading-tight uppercase tracking-tighter">
                  Budget is filling fast. Apply now to secure your slot.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <button className="w-full py-4 bg-teal-500 text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2">
                  Submit Content <IconArrowRight size={16} stroke={3} />
                </button>
                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                  Save for Later
                </button>
              </div>
            </div>

            {/* Top Video Preview (Submission Join) */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2">
                <IconTrophy size={14} className="text-yellow-500" /> Community
                Top Pick
              </h4>
              <div className="flex items-center gap-3">
                <div className="w-12 h-16 bg-zinc-800 rounded-lg overflow-hidden border border-white/10">
                  <img
                    src="https://images.unsplash.com"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-tighter truncate">
                    @creativestorm
                  </p>
                  <p className="text-[9px] font-bold text-teal-500">
                    24.5k Views • Approved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Analytic Component
const AnalyticTile = ({ label, value, icon }: any) => (
  <div className="bg-[#11141A] border border-white/5 p-5 rounded-3xl hover:border-white/10 transition-colors">
    <div className="text-gray-500 mb-3">{icon}</div>
    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">
      {label}
    </p>
    <p className="text-sm font-bold text-white uppercase tracking-tighter">
      {value}
    </p>
  </div>
);

export default CampaignDetail;
