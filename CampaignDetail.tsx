import React, { useState } from "react";
import {
  IconEdit,
  IconUserPlus,
  IconChartBar,
  IconTarget,
  IconShare,
  IconCopy,
  IconCheck,
  IconSettings,
} from "@tabler/icons-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockCampaign = {
  // System Fields
  id: "cpgn_teal_2024_x1",
  created: "2024-05-15T09:00:00.000Z",
  updated: "2024-05-20T14:30:00.000Z",

  // Basic Info
  title: "Summer Glow Hydration Series",
  description:
    "Join us for our flagship summer campaign focusing on sustainable skincare and high-performance hydration products.",
  category: "Skincare & Wellness",
  status: "active",
  visibility: "public",
  product_type: "Physical Product / Affiliate",
  launch_date: "2024-06-01T00:00:00.000Z",
  end_date: "2024-08-31T23:59:59.000Z",

  // Brand & Ownership
  brand_id: "brand_pure_glow_001",
  user_id: "user_manager_admin_99",

  // Financials
  budget: 25000,
  cpm: 1.2,
  country: 1, // Let's assume 1 maps to "Global/USA" in your logic

  // Targeting & Requirements
  gender: "all",
  age_ranges: ["18-24", "25-34"],
  min_followers: 10000,
  min_engagement: 3.5,
  requirements: `
    <ul>
      <li>Must post 1 high-quality TikTok Reel or Instagram Reel</li>
      <li>Feature the product prominently in the first 3 seconds</li>
      <li>Include our custom tracking link in bio</li>
      <li>Tag @PureGlowWellness and use #GlowSummer24</li>
    </ul>
  `,

  // Platform Payouts (Matches your Grid component)
  platform_payouts: [
    {
      platform: "tiktok",
      rate: "$1.20",
      minPayout: "$50.00",
      maxPayout: "$5,000.00",
    },
    {
      platform: "instagram",
      rate: "$0.85",
      minPayout: "$25.00",
      maxPayout: "$2,500.00",
    },
  ],

  // Assets & Relations
  thumbnail: "https://images.unsplash.com",

  // These IDs would be used with pb.collection('submissions').getFullList({ filter: 'campaign = id' })
  top_videos: [
    "vid_001_alex_reels",
    "vid_002_sarah_vlog",
    "vid_003_jordan_tips",
  ],
};

const CampaignDetails = ({ campaign }) => {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <div className="min-h-screen bg-[#080A0F] text-white p-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase">
              {campaign.status}
            </span>
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              {campaign.category}
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">
            {campaign.title}
          </h1>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm">
            <IconEdit size={18} /> Edit Campaign
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-black hover:bg-teal-400 transition-all font-bold text-sm">
            <IconUserPlus size={18} /> Invite Creators
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-8 border-b border-white/5 mb-10">
        {["Analytics", "Requirements", "Creators", "Settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === tab.toLowerCase()
                ? "text-teal-400"
                : "text-gray-500 hover:text-white"
            }`}
          >
            {tab}
            {activeTab === tab.toLowerCase() && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 shadow-[0_0_10px_#2dd4bf]" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Stats & Chart */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Total Budget",
                value: `$${campaign.budget}`,
                sub: "42% spent",
              },
              { label: "Active Creators", value: "12", sub: "+3 this week" },
              {
                label: "Avg. CPM",
                value: `$${campaign.cpm}`,
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
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-[10px] text-teal-400 font-bold mt-2">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Analytics Chart */}
          <div className="bg-[#11141A] border border-white/5 p-8 rounded-3xl h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Performance Overview</h3>
              <select className="bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-xs font-bold outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart
                data={[
                  { n: "Mon", v: 400 },
                  { n: "Tue", v: 700 },
                  { n: "Wed", v: 600 },
                  { n: "Thu", v: 900 },
                  { n: "Fri", v: 800 },
                ]}
              >
                <defs>
                  <linearGradient id="colorTeal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff05"
                  vertical={false}
                />
                <XAxis
                  dataKey="n"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#4B5563", fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D1117",
                    border: "1px solid #ffffff10",
                    borderRadius: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#2DD4BF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTeal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Requirements & Payouts */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Requirements Card */}
          <div className="bg-[#11141A] border border-white/5 p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 text-teal-400">
              <IconTarget size={20} />
              <h3 className="font-bold uppercase text-xs tracking-widest">
                Requirements
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Min. Followers</span>
                <span className="font-bold">
                  {campaign.min_followers?.toLocaleString()}
                </span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Min. Engagement</span>
                <span className="font-bold">{campaign.min_engagement}%</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Gender</span>
                <span className="font-bold capitalize">{campaign.gender}</span>
              </li>
            </ul>
          </div>

          {/* Payout Info */}
          <div className="bg-[#11141A] border border-white/5 p-8 rounded-3xl space-y-6">
            <h3 className="font-bold uppercase text-xs tracking-widest text-gray-500">
              Payout Tiers
            </h3>
            {campaign.platform_payouts?.map((p, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 rounded-2xl bg-black/20 border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                    <span className="text-[10px] font-black">
                      {p.platform[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-bold">{p.platform}</span>
                </div>
                <span className="text-teal-400 font-black">{p.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
