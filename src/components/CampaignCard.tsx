import React from "react";
import type { CampaignDetailsType } from "../types";

import { useHome } from "../hooks/useHome";
import { IconBuilding } from "@tabler/icons-react";
import { FormatUGXCurrency, GetFullGenderName } from "../lib/helpers";

const CampaignCard: React.FC<{ campaign: CampaignDetailsType }> = ({
  campaign,
}) => {
  const { setActiveView, setCampaignInDetails } = useHome();
  // Join Feature: Calculate utilization based on joined submissions
  // const spent =
  //   campaign.expand?.["submissions(campaign)"]?.reduce(
  //     (acc, curr) => acc + curr.payout,
  //     0,
  //   ) || 0;
  const progress = 59; //(spent / campaign.budget) * 100;

  const brand = campaign.expand?.brand;

  return (
    <div
      className="group bg-[#11141A] border border-white/[0.04] rounded-[32px] overflow-hidden hover:border-teal-500/20 transition-all duration-500 flex flex-col shadow-2xl active:scale-[0.98] cursor-pointer"
      onClick={() => {
        setCampaignInDetails(campaign);
        setActiveView("Campaign Details");
      }}
    >
      {/* Header: Visual Context */}
      <div className="h-32 relative overflow-hidden bg-zinc-950">
        {/* Thumbnail Image or Placeholder */}
        {campaign.thumbnail ? (
          <img
            src={campaign.thumbnail}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Campaign"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-teal-400/10">
            <svg
              xmlns="http://www.w3.org"
              className="h-10 w-10 stroke-teal-400/20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 8h.01" />
              <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" />
              <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
              <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
            </svg>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11141A] via-[#11141A]/20 to-transparent z-10" />

        <div className="absolute top-3 left-3 z-20 flex gap-2">
          <span className="bg-teal-500 text-black text-[8px] font-black uppercase px-2 py-0.5 rounded-md">
            {campaign.product_type}
          </span>
          {brand?.is_verified && (
            <span className="bg-white/10 backdrop-blur-md text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-md border border-white/10">
              Verified
            </span>
          )}
        </div>
      </div>
      <div className="px-5 pb-5 -mt-8 relative z-20 space-y-4">
        {/* Brand & Title (Requires Brand Join) */}
        <div className="flex items-end gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#11141A] bg-zinc-800 shadow-xl flex items-center justify-center">
            {!brand?.name ? (
              <img
                src={brand?.name}
                alt={brand?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              /* Fallback Brand SVG */
              <div className="w-full h-full flex items-center justify-center bg-teal-400/10">
                <IconBuilding
                  className="h-6 w-6 stroke-teal-400/50"
                  strokeWidth={2}
                />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-black text-teal-500 uppercase tracking-widest truncate">
              {brand?.name || "Unknown Brand"}
            </p>
            <h3 className="text-sm font-bold text-white leading-tight line-clamp-1">
              {campaign.title}
            </h3>
          </div>
        </div>

        {/* Campaign Specs (Direct from Model) */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-2xl">
            <p className="text-[7px] font-black text-gray-500 uppercase mb-1">
              CPM Rate
            </p>
            <p className="text-xs font-bold text-white">
              {FormatUGXCurrency(campaign.cpm || 3000)}
            </p>
          </div>
          <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-2xl">
            <p className="text-[7px] font-black text-gray-500 uppercase mb-1">
              Min. Followers
            </p>
            <p className="text-xs font-bold text-white">
              {campaign.min_followers
                ? `${(campaign.min_followers / 1000).toFixed(0)}k+`
                : "Open"}
            </p>
          </div>
        </div>

        {/* Real-time Budget Utilization (Requires Submission Join) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[7px] font-black uppercase text-gray-500">
            <span>Budget Exhaustion</span>
            <span
              className={progress > 85 ? "text-orange-500" : "text-teal-500"}
            >
              {progress.toFixed(1)}%
            </span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ${progress > 85 ? "bg-orange-500" : "bg-teal-500"}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Requirements Preview */}
        <div className="flex items-center gap-2 text-[8px] font-bold text-gray-400 uppercase">
          <span className="px-1.5 py-0.5 border border-white/10 rounded">
            {GetFullGenderName(campaign.gender)}
          </span>
          <span className="px-1.5 py-0.5 border border-white/10 rounded">
            {campaign.category || "Not Specified"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
