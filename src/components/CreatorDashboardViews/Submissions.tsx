import React from "react";
import SubmissionCard from "./sections/SubmissionCard";
import { SubmissionCardSkeleton } from "../Skeletons";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_SUBMISSIONS = [
  {
    id: "sub_01",
    campaignTitle: "Urban Streetwear Launch 2024",
    brandName: "Nike East Africa",
    status: "Approved",
    payout: 250000,
    submittedDate: "Mar 04, 2026",
    contentLink: "https://instagram.com/p/mock1",
    thumbnail: "https://unsplash.com",
  },
  {
    id: "sub_02",
    campaignTitle: "Summer Hydration Campaign",
    brandName: "Rwenzori Pure",
    status: "Pending",
    payout: 120000,
    submittedDate: "Mar 05, 2026",
    contentLink: "https://tiktok.com/@creator/video/mock2",
    thumbnail: "https://unsplash.com",
  },
  {
    id: "sub_03",
    campaignTitle: "Weekend Data Blast",
    brandName: "MTN Uganda",
    status: "Rejected",
    payout: 85000,
    submittedDate: "Mar 01, 2026",
    contentLink: "https://twitter.com/creator/status/mock3",
    thumbnail: "https://unsplash.com",
  },
  {
    id: "sub_04",
    campaignTitle: "New Menu Tasting",
    brandName: "Cafe Javas",
    status: "Flagged",
    payout: 150000,
    submittedDate: "Mar 05, 2026",
    contentLink: "https://instagram.com/p/mock4",
    thumbnail: null, // To test your SVG fallback
  },
];
const Submissions: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("All");

  const filteredSubmissions =
    activeTab === "All"
      ? MOCK_SUBMISSIONS
      : MOCK_SUBMISSIONS.filter((sub) => sub.status === activeTab);

  const tabs = ["All", "Pending", "Approved", "Rejected", "Flagged"];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Submissions <span className="text-teal-500">.</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
            Content Pipeline & Revenue Tracking
          </p>
        </div>

        {/* Stats Summary (Added for Professional Look) */}
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-2xl">
            <p className="text-[10px] font-black text-gray-500 uppercase">
              Total Payout
            </p>
            <p className="text-lg font-bold text-white">UGX 0</p>
          </div>
        </div>
      </header>

      <div className="relative border-b border-white/[0.05]">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${
                activeTab === tab
                  ? "text-teal-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab}
              <span className="ml-2 text-[10px] opacity-50">
                {tab === "All"
                  ? MOCK_SUBMISSIONS.length
                  : MOCK_SUBMISSIONS.filter((s) => s.status === tab).length}
              </span>

              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.4)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-max mt-8 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {filteredSubmissions.map((sub) => (
            <motion.div
              key={sub.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <SubmissionCard submission={sub} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-max">
        {[...Array(4)].map((_, idx) => (
          <SubmissionCardSkeleton key={idx} />
        ))}
      </div>

      {/* Professional Empty State */}
      <div className="relative group">
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-teal-500/5 blur-[100px] rounded-full" />

        <div className="relative py-24 flex flex-col items-center justify-center text-center border border-white/[0.03] bg-[#11141A]/50 backdrop-blur-xl rounded-[40px] border-dashed">
          <div className="w-24 h-24 mb-6 relative">
            <div className="absolute inset-0 bg-teal-500/20 rounded-3xl rotate-12 group-hover:rotate-6 transition-transform duration-500" />
            <div className="absolute inset-0 bg-zinc-900 rounded-3xl border border-teal-500/30 flex items-center justify-center shadow-2xl">
              <svg
                xmlns="http://w3.org"
                className="h-10 w-10 stroke-teal-400"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                <path d="M7 9l5 5l5 -5" />
                <path d="M12 4l0 10" />
              </svg>
            </div>
          </div>

          <div className="space-y-2 px-6">
            <h3 className="text-2xl font-bold text-white">
              Ready to start earning?
            </h3>
            <p className="text-gray-400 max-w-sm mx-auto text-sm leading-relaxed">
              Your submission queue is currently empty. Your content journey
              begins when you apply to your first campaign.
            </p>
          </div>

          <button className="mt-8 bg-teal-500 hover:bg-teal-400 text-black font-black uppercase text-xs tracking-widest py-4 px-10 rounded-2xl shadow-xl shadow-teal-500/10 transition-all active:scale-95">
            Explore Opportunities
          </button>
        </div>
      </div>
    </div>
  );
};

export default Submissions;
