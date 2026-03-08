import React from "react";
import {
  IconWallet,
  IconUsers,
  IconLink,
  IconArrowUpRight,
  IconActivity,
  IconCircleCheck,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { pb } from "../../lib/pocketbase";
import { FormatUGXCurrency, GreetUser } from "../../lib/helpers";

import { RevenueChart } from "../Charts";

import MyCampaigns from "./sections/MyCampaigns";
import Invites from "./sections/Invites";

const Home = () => {
  const userName = pb?.authStore?.record?.name || "Kibuule Noah";

  const stats = [
    {
      label: "Available",
      value: FormatUGXCurrency(1250000),
      icon: <IconWallet size={20} />,
      color: "text-teal-400",
    },
    {
      label: "Platform Reach",
      value: "2.4M",
      icon: <IconUsers size={20} />,
      color: "text-blue-400",
    },
    {
      label: "Verified Links",
      value: "4 Assets",
      icon: <IconLink size={20} />,
      color: "text-purple-400",
    },
  ];

  const MOCK_CHART_DATA = [
    { day: "Mon", total: 400000 },
    { day: "Tue", total: 300000 },
    { day: "Wed", total: 600000 },
    { day: "Thu", total: 800000 },
    { day: "Fri", total: 500000 },
    { day: "Sat", total: 900000 },
    { day: "Sun", total: 1250000 },
  ];

  // Container variants for staggered entrance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12 pb-20 max-w-7xl mx-auto"
    >
      {/* Hero Section: Dynamic & Bold */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-4">
        <motion.div variants={item} className="space-y-2">
          <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2">
            <span className="w-8 h-[1px] bg-teal-500/30"></span> Creator
            Dashboard
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
            {GreetUser()}
            <br />
            <span className="capitalize text-white/20 hover:text-white/40 transition-colors duration-500 cursor-default">
              {userName}.
            </span>
          </h1>
        </motion.div>

        <motion.div variants={item} className="flex gap-4">
          <button className="group relative overflow-hidden bg-teal-500 text-black font-black px-10 py-5 rounded-[24px] text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-2xl shadow-teal-500/20">
            <span className="relative z-10 flex items-center gap-2">
              Explore Gigs <IconArrowUpRight size={16} />
            </span>
          </button>
        </motion.div>
      </header>

      {/* Metrics Grid */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group bg-[#11141A] border border-white/[0.05] p-8 rounded-[40px] hover:border-teal-500/30 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              {React.cloneElement(stat.icon as React.ReactElement, {
                size: 120,
              })}
            </div>
            <div
              className={`w-12 h-12 bg-white/[0.03] rounded-2xl flex items-center justify-center ${stat.color} mb-6 border border-white/5`}
            >
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-black text-white tracking-tighter">
              {stat.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* In your component */}
      <div className="lg:col-span-2 bg-[#11141A] border border-white/[0.05] rounded-[40px] p-8 pb-2 relative overflow-hidden group min-h-[350px] flex flex-col">
        <RevenueChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* My Campaigns (2/3 Width) */}
        <div className="md:col-span-8 space-y-6">
          <MyCampaigns />
        </div>

        {/* Invites (1/3 Width) */}
        <div className="md:col-span-4 space-y-6">
          <Invites />
        </div>
      </div>

      <div className="flex justify-center items-center gap-6">
        {/* Profile Strength */}
        <div className="bg-teal-500 w-2xl p-8 rounded-[40px] flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-all">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-black text-teal-500 p-1.5 rounded-lg">
                <IconCircleCheck size={18} />
              </div>
              <p className="text-[10px] font-black text-black/60 uppercase tracking-widest">
                Account Health
              </p>
            </div>
            <h4 className="text-2xl font-black text-black tracking-tight leading-none">
              Complete Verification
            </h4>
            <p className="text-black/50 text-[10px] font-bold uppercase tracking-wider">
              Unlock UGX 1M+ Gigs
            </p>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-black/10 fill-none"
                strokeWidth="6"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-black fill-none"
                strokeWidth="6"
                strokeDasharray="213"
                strokeDashoffset="42"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-sm font-black text-black">80%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Activity Ledger: Minimalist & Clean */}
        <motion.div variants={item} className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <IconActivity size={16} className="text-teal-500" /> Recent Events
            </h3>
          </div>

          <div className="bg-[#11141A] border border-white/[0.05] p-2 rounded-[40px] divide-y divide-white/[0.03]">
            {[
              {
                label: "Payment Received",
                val: "+250k",
                date: "2h ago",
                status: "SUCCESS",
              },
              {
                label: "Content Approved",
                val: "Nile Gig",
                date: "1d ago",
                status: "VERIFIED",
              },
              {
                label: "Gig Joined",
                val: "Mumford",
                date: "2d ago",
                status: "ACTIVE",
              },
            ].map((log, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-6 hover:bg-white/[0.02] transition-colors rounded-[32px]"
              >
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    {log.label}
                  </p>
                  <p className="text-sm font-bold text-white">{log.val}</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-1 justify-end">
                    <IconCircleCheck size={10} className="text-teal-500" />
                    <span className="text-[9px] font-black text-teal-500 uppercase">
                      {log.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600 font-medium">
                    {log.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
