import React, { useState } from "react";
import {
  IconEdit,
  IconUserPlus,
  IconChartBar,
  IconTarget,
  IconCheck,
  IconUsers,
  IconCalendar,
  IconAlertCircle,
} from "@tabler/icons-react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CreatorInvitesSection from "./BrandDashboardViews/sections/CreatorInvitesSection";
import CampaignCreatorsSection from "./BrandDashboardViews/sections/CampaignCreatorsSection";
import { useCampaignDetail } from "../hooks/useCampaignDetail";
import { GetFullGenderName, FormatUGXCurrency } from "../lib/helpers";
import CampaignTopVideos from "./CampaignDetailSections/CampaignTopVideos";
import { AnalyticTile } from "./CampaignDetailSections/sections";
import PerformanceOverview from "./CampaignDetailSections/PerformanceOverview";
import CampaignBrief from "./CampaignDetailSections/CampaignBrief";
import PayoutTiers from "./CampaignDetailSections/PayoutTiers";

const platform_payouts = [
  {
    platform: "tiktok",
    rate: 5000,
    minPayout: 25000,
    maxPayout: 2500000,
  },
  {
    platform: "instagram",
    rate: 5000,
    minPayout: 25000,
    maxPayout: 2500000,
  },
];

export const CampaignDescription = ({ desc }: { desc: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <p
        className={`text-gray-400 text-lg md:text-xl max-w-4xl ${!isExpanded && "line-clamp-3"}`}
      >
        {desc}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-500 hover:underline mt-2 text-sm font-medium"
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>
    </div>
  );
};

const CampaignDetails = () => {
  const { setActiveView, campaignInDetails, ctxType } = useCampaignDetail();
  if (!campaignInDetails) {
    return "Not Found";
  }

  const is_brand = ctxType === "Brand";

  const campaign = campaignInDetails;

  const analyticsData = [
    {
      label: "Total Reach",
      value: "1.2M+",
      icon: <IconChartBar size={18} />,
    },
    {
      label: "Target Gender",
      value: GetFullGenderName(campaign.gender),
      icon: <IconUsers size={18} />,
    },
    {
      label: "Min. Subs",
      value: "2.4k",
      icon: <IconTarget size={18} />,
    },
    {
      label: "Days Left",
      value: "14",
      icon: <IconCalendar size={18} />,
    },
  ];

  return (
    <div className="bg-[#0A0B0E] relative min-h-screen text-white max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="mx-auto p-1 w-full">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase">
                {campaign.status || "Pending"}
              </span>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                {campaign.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              {campaign.title}
            </h1>
            <CampaignDescription desc={campaign.description} />
          </div>

          {is_brand && (
            <div className="flex gap-3 shrink-0">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm">
                <IconEdit size={18} /> Edit
              </button>
              <button
                onClick={() => setActiveView("Invite Creators")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-black hover:bg-teal-400 transition-all font-bold text-sm shadow-[0_0_20px_rgba(45,212,191,0.2)]"
              >
                <IconUserPlus size={18} /> Invite
              </button>
            </div>
          )}
        </div>

        {!is_brand && (
          <>
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
              {analyticsData.map((tile, index) => (
                <AnalyticTile
                  key={index}
                  label={tile.label}
                  value={tile.value}
                  icon={tile.icon}
                />
              ))}
            </section>

            <div className="w-full py-4 flex justify-center">
              <button className="w-full max-w-2xl bg-white text-black font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98]">
                Join Campaign
              </button>
            </div>
          </>
        )}

        {/* Grid System - Changed to ensure columns fit correctly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {is_brand && (
            <div className="lg:col-span-8 space-y-6 md:space-y-8 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    label: "Total Budget",
                    value: FormatUGXCurrency(campaign.budget),
                    sub: "42% spent",
                  },
                  {
                    label: "Active Creators",
                    value: "12",
                    sub: "+3 this week",
                  },
                  {
                    label: "Avg. CPM",
                    value: FormatUGXCurrency(campaign.cpm),
                    sub: "System optimized",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-[#11141A] border border-white/5 p-6 rounded-3xl"
                  >
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-black truncate">{stat.value}</p>
                    <p className="text-[10px] text-teal-400 font-bold mt-2">
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>

              <PerformanceOverview />
            </div>
          )}

          {is_brand && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full my-4">
              <div className="md:col-span-2 bg-[#11141A] border border-white/5 p-1 md:p-8 rounded-3xl min-w-0">
                <h3 className="font-bold text-lg p-3">Creator Invites</h3>
                <CreatorInvitesSection />
              </div>

              <section className="bg-[#0D1117] border border-white/5 rounded-3xl p-1 flex flex-col">
                <h3 className="font-bold text-lg p-3">Campaign Creators</h3>
                <CampaignCreatorsSection />
              </section>
            </div>
          )}

          <CampaignBrief />

          <div className="bg-[#11141A] border border-white/5 p-6 md:p-8 rounded-3xl min-w-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h3 className="font-bold text-lg">Top Performers</h3>
              <button className="px-8 py-4 rounded-full border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                View All Content
              </button>
            </div>

            <CampaignTopVideos />
          </div>

          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <PayoutTiers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
