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
  IconUser,
  IconBrandTiktok,
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
import { useBrandDashboard } from "../../../hooks/useBrandDashboard";
import { FormatUGXCurrency } from "../../../constants";
import { motion } from "framer-motion";
import CreatorInvitesSection from "./CreatorInvitesSection";
import CampaignCreatorsSection from "./CampaignCreatorsSection";
import BackButton from "../../BackButton";

const VideoCard = ({ video, index }: { video: any; index: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
    className="group relative bg-[#11141A] border border-teal-500 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-teal-500/30"
  >
    {/* Video Preview Container */}
    <div className="relative aspect-[16/10] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-transparent to-transparent z-10 opacity-60" />
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
        <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.4)]">
          <svg className="w-6 h-6 text-black fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      {/* Top Performance Badge */}
      <div className="absolute top-6 left-6 z-20">
        <span className="px-4 py-1.5 rounded-full bg-[#0A0B0E]/80 backdrop-blur-md border border-white/10 text-[10px] font-black text-teal-500 uppercase tracking-widest">
          Rank #{index + 1}
        </span>
      </div>
    </div>

    {/* Video Details */}
    <div className="p-8 space-y-6">
      <div className="space-y-2">
        <h4 className="text-md font-display font-black text-white uppercase tracking-tighter group-hover:text-teal-500 transition-colors">
          {video.title}
        </h4>
        <div className="col-span-1 md:col-span-5 flex items-center gap-2">
          <div className="w-12 h-12 flex items-center justify-center font-black text-[#14B8A6]">
            <IconUser />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-white font-medium uppercase tracking-tight">
              @creator_username
            </p>
            <p className="text-gray-600 text-xs font-medium flex">
              <IconBrandTiktok size={18} />
              creator.email
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
        <div>
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
            Impressions
          </p>
          <p className="text-xl font-display font-black text-white">
            {video.views}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
            Engagement
          </p>
          <p className="text-xl font-display font-black text-teal-500">
            {video.engagement}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const CampaignTopVideos = ({ campaignName = "Summer Launch" }) => {
  const topVideos = [
    {
      title: "Main Promo",
      views: "1.2M",
      engagement: "8.4%",
      duration: "0:30",
      campaign: campaignName,
      thumbnail: "/api/placeholder/800/500",
    },
    {
      title: "Influencer Cut",
      views: "890K",
      engagement: "12.1%",
      duration: "0:15",
      campaign: campaignName,
      thumbnail: "/api/placeholder/800/500",
    },
    {
      title: "Feature Teaser",
      views: "640K",
      engagement: "9.8%",
      duration: "0:45",
      campaign: campaignName,
      thumbnail: "/api/placeholder/800/500",
    },
  ];

  return (
    <div className="mx-auto space-y-16 py-3">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        {topVideos.map((video, idx) => (
          <VideoCard key={idx} video={video} index={idx} />
        ))}
      </div>
    </div>
  );
};

const mcampaign = {
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

const CampaignDetails = () => {
  const { setActiveView, campaignInDetails } = useBrandDashboard();
  if (!campaignInDetails) {
    return "Not Found";
  }
  const campaign = campaignInDetails;
  return (
    <div className="bg-[#0A0B0E] relative min-h-screen text-white pb-20 space-y-12">
      <div className="mx-auto p-1 w-full">
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
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              {campaign.title}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl">
              {campaign.description}
            </p>
          </div>

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
        </div>

        {/* Grid System - Changed to ensure columns fit correctly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Column: Stats & Chart */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8 min-w-0">
            {/* Quick Stats: use grid-cols-1 for mobile, 3 for desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Total Budget",
                  value: FormatUGXCurrency(campaign.budget),
                  sub: "42% spent",
                },
                { label: "Active Creators", value: "12", sub: "+3 this week" },
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

            {/* Analytics Chart: min-w-0 on parent is required for ResponsiveContainer to work in a grid */}
            <div className="bg-[#11141A] border border-white/5 p-6 md:p-8 rounded-3xl h-[400px] min-w-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Performance Overview</h3>
                <select className="bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-xs font-bold outline-none text-white">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
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
                      <linearGradient
                        id="colorTeal"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#2DD4BF"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#2DD4BF"
                          stopOpacity={0}
                        />
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
          </div>

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

          <div className="bg-[#11141A] border border-white/5 p-6 md:p-8 rounded-3xl min-w-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h3 className="font-bold text-lg">Top Performers</h3>
              <button className="px-8 py-4 rounded-full border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                View All Content
              </button>
            </div>

            <CampaignTopVideos />
          </div>

          {/* Right Column: Requirements & Payouts */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <div className="bg-[#11141A] border border-white/5 p-8 rounded-3xl space-y-6">
              <div className="flex items-center gap-2 text-teal-400 uppercase text-[10px] font-black tracking-widest">
                <IconTarget size={16} />
                <h3>Requirements</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Min. Followers</span>
                  <span className="font-bold">
                    {campaign.min_followers?.toLocaleString()}
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-[#11141A] border border-white/5 p-8 rounded-3xl space-y-6">
              <h3 className="font-bold uppercase text-[10px] tracking-widest text-gray-500">
                Payout Tiers
              </h3>
              <div className="space-y-3">
                {campaign.platform_payouts?.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-4 rounded-2xl bg-black/40 border border-white/5"
                  >
                    <div className="flex items-center gap-3 font-bold text-sm">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 font-black text-[10px]">
                        {p.platform[0].toUpperCase()}
                      </div>
                      {p.platform}
                    </div>
                    <span className="text-teal-400 font-black">{p.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
