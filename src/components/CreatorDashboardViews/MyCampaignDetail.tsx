import React, { useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  IconVideo,
  IconCheck,
  IconAlertCircle,
  IconCalculator,
  IconLock,
  IconMessageCircle,
  IconClock,
} from "@tabler/icons-react";
import CampaignBrief from "../CampaignDetailSections/CampaignBrief";
import PayoutTiers from "../CampaignDetailSections/PayoutTiers";
import CollapsibleDescription from "../CollapsibleDescription";
import { useCreatorDashboard } from "../../hooks/useCreatorDashboard";

const MyCampaignDetail: React.FC = () => {
  const [estimateViews, setEstimateViews] = useState(50000);
  const { participantCampaignInDetail } = useCreatorDashboard();

  if (!participantCampaignInDetail) {
    return;
  }

  const submissions: string[] = [];
  const maxSubmissions = 3;

  const campaign = participantCampaignInDetail.expand?.campaign;

  // Payout Projection Data
  const projectionData = [
    { views: "10k", payout: (10000 / 1000) * campaign.cpm },
    { views: "50k", payout: (50000 / 1000) * campaign.cpm },
    { views: "100k", payout: (100000 / 1000) * campaign.cpm },
    { views: "200k", payout: (200000 / 1000) * campaign.cpm },
  ];

  // Audience Fit (Gender/Age)
  const fitData = [
    { name: "Match", value: 85 },
    { name: "Other", value: 15 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* 1. Cinematic Header */}
      <header className="relative h-64 rounded-[48px] overflow-hidden border border-white/10 bg-zinc-950">
        <div className="absolute inset-0 bg-gradient-to-t from-[#11141A] via-[#11141A]/40 to-transparent z-10" />
        <div className="absolute bottom-8 left-10 z-20 space-y-2">
          <span className="px-3 py-1 bg-teal-500 text-black text-[10px] font-black uppercase rounded-lg">
            {campaign.status || "Pending"}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            {campaign.title}
          </h1>
          <CollapsibleDescription desc={campaign.description} />
        </div>
      </header>

      <section className="bg-[#11141A] border border-white/5 rounded-[40px] p-8 space-y-6">
        <div className="flex items-center gap-2 text-teal-500">
          <IconClock size={20} />
          <p className="text-[10px] font-black uppercase tracking-widest">
            Campaign Deadline
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase">
              Ends In
            </p>
            <p className="text-4xl font-black text-white tracking-tight">
              3d 14h
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-black text-gray-500 uppercase">
              End Date
            </p>
            <p className="text-sm font-bold text-gray-300">Aug 21, 2026</p>
          </div>
        </div>

        <p className="text-[11px] text-gray-400">
          Submit your videos before the campaign closes. Late submissions will
          not be accepted.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#11141A] border border-white/5 rounded-[40px] p-8 h-72">
          <p className="text-[10px] font-black text-gray-500 uppercase">
            Payout Scaling
          </p>

          <p className="text-[11px] text-gray-400 mb-4">
            Estimated earnings as your video gains views. Based on CPM rate of
            <span className="text-white font-bold">
              {" "}
              UGX {campaign.cpm}
            </span>{" "}
            per 1,000 views.
          </p>

          <ResponsiveContainer width="100%" height="75%">
            <AreaChart data={projectionData}>
              <defs>
                <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />

              <XAxis
                dataKey="views"
                tick={{ fill: "#9ca3af", fontSize: 10 }}
                label={{
                  value: "Video Views",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#6b7280",
                  fontSize: 10,
                }}
              />

              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 10 }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                label={{
                  value: "Payout (UGX)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#6b7280",
                  fontSize: 10,
                }}
              />

              <Tooltip
                contentStyle={{
                  background: "#11141A",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  fontSize: "11px",
                }}
                formatter={(value: number) =>
                  `UGX ${value.toLocaleString()} payout`
                }
                labelFormatter={(label) => `${label} views`}
              />

              <Area
                type="monotone"
                dataKey="payout"
                stroke="#2dd4bf"
                fill="url(#chartColor)"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: "#2dd4bf" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[#11141A] border border-white/5 rounded-[40px] p-8 h-72 flex flex-col">
          <p className="text-[10px] font-black text-gray-500 uppercase">
            Audience Match Score
          </p>

          <p className="text-[11px] text-gray-400 mb-4">
            How well your audience demographics align with the campaign’s target
            audience.
          </p>

          <div className="relative flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fitData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  <Cell fill="#2dd4bf" />
                  <Cell fill="rgba(255,255,255,0.06)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Metric */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-white">85%</span>
              <span className="text-[10px] uppercase text-gray-400 font-bold">
                Match
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-2 text-[10px] font-bold uppercase">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="w-2 h-2 bg-teal-400 rounded-full" />
              Match
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 bg-white/20 rounded-full" />
              Other
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-7 space-y-4 space-x-4">
        <div className="md:col-span-7 bg-[#11141A] border border-teal-500/20 p-8 rounded-[40px] space-y-6 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-black text-white">
                Your Submissions
              </h3>
              <span className="text-[10px] font-black text-teal-500">
                {submissions.length} / {maxSubmissions}
              </span>
            </div>

            {/* Slot System */}
            <div className="space-y-3">
              {[1, 2, 3].map((slot) => (
                <div
                  key={slot}
                  className={`p-4 rounded-2xl border flex items-center justify-between ${submissions[slot - 1] ? "border-teal-500/30 bg-teal-500/5" : "border-dashed border-white/10 opacity-40"}`}
                >
                  <div className="flex items-center gap-3">
                    <IconVideo
                      size={18}
                      className={
                        submissions[slot - 1]
                          ? "text-teal-500"
                          : "text-gray-500"
                      }
                    />
                    <span className="text-xs font-bold text-white">
                      {submissions[slot - 1]
                        ? "Video Submitted"
                        : `Slot ${slot} Empty`}
                    </span>
                  </div>
                  {submissions[slot - 1] ? (
                    <IconCheck size={16} className="text-teal-500" />
                  ) : (
                    <IconLock size={16} className="text-gray-700" />
                  )}
                </div>
              ))}
            </div>

            {submissions.length < maxSubmissions ? (
              <button className="w-full py-4 bg-teal-500 text-black font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-teal-500/10 active:scale-95 transition-all">
                Submit New Video
              </button>
            ) : (
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                <IconAlertCircle size={18} className="text-amber-500" />
                <p className="text-[9px] text-gray-400 font-bold uppercase leading-tight">
                  Max submissions reached. Let other creators join!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Campaign Brief Summary */}
        <div className="md:col-span-7">
          <CampaignBrief />
        </div>
        <div className="md:col-span-3 min-h-full">
          <PayoutTiers />
        </div>
        <div className="md:col-span-4 bg-[#11141A] border border-white/5 rounded-[40px] p-8 flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 space-y-6 w-full">
            <div className="flex items-center gap-2 text-teal-500">
              <IconCalculator size={20} />
              <p className="text-[10px] font-black uppercase tracking-widest">
                Earnings Simulator
              </p>
            </div>
            <input
              type="range"
              min="1000"
              max="500000"
              step="1000"
              value={estimateViews}
              onChange={(e) => setEstimateViews(Number(e.target.value))}
              className="w-full accent-teal-500 bg-white/5 h-2 rounded-full appearance-none"
            />
            <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase">
              <span>1k Views</span>
              <span>500k Views</span>
            </div>
          </div>
          <div className="shrink-0 text-center md:text-right">
            <p className="text-[10px] font-black text-gray-500 uppercase">
              Est. Payout
            </p>
            <p className="text-4xl font-black text-white">
              UGX {((estimateViews / 1000) * campaign.cpm).toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-10">
        <div className="space-y-6">
          <div className="bg-[#11141A] border border-white/5 rounded-[40px] p-8 space-y-6">
            <div className="flex items-center gap-2 text-teal-500">
              <IconMessageCircle size={20} />
              <p className="text-[10px] font-black uppercase tracking-widest">
                Campaign Support
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-white">
                Need help with this campaign?
              </p>

              <p className="text-[11px] text-gray-400">
                If you have questions about the requirements, payouts, or
                submission process, contact the campaign manager.
              </p>
            </div>

            <button className="w-full py-4 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-white/10 transition">
              Contact Manager
            </button>

            <button className="w-full py-4 bg-transparent border border-red-500/20 text-red-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-red-500/10 transition">
              Report Campaign Issue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyCampaignDetail;
