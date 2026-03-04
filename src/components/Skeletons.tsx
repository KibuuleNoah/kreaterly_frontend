import React from "react";

export const CampaignSkeleton: React.FC = () => {
  return (
    <div className="bg-[#11141A] border border-white/[0.04] rounded-[32px] overflow-hidden flex flex-col shadow-2xl relative w-full h-[450px]">
      {/* 1. Cover Image Skeleton (h-36 to match your card) */}
      <div className="h-36 w-full bg-white/[0.02] relative overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

        {/* Badge Skeletons */}
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="w-12 h-4 bg-white/5 rounded-md animate-pulse" />
          <div className="w-16 h-4 bg-white/5 rounded-md animate-pulse" />
        </div>
      </div>

      <div className="px-5 pb-5 -mt-8 relative z-10 space-y-5">
        {/* 2. Brand Meta Join Skeleton */}
        <div className="flex items-end gap-3">
          {/* Logo Box */}
          <div className="w-12 h-12 rounded-xl border-2 border-[#11141A] bg-zinc-800 animate-pulse shrink-0 shadow-2xl" />

          <div className="flex-1 space-y-2 pb-1">
            {/* Brand Name Label */}
            <div className="w-20 h-2 bg-teal-500/20 rounded animate-pulse" />
            {/* Title Line */}
            <div className="w-3/4 h-4 bg-white/10 rounded animate-pulse" />
          </div>
        </div>

        {/* 3. Financial Panel Skeleton */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="space-y-2">
            <div className="w-10 h-1.5 bg-white/5 rounded animate-pulse" />
            <div className="w-16 h-3 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="w-10 h-1.5 bg-white/5 rounded animate-pulse" />
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded-full bg-white/5 animate-pulse" />
              <div className="w-4 h-4 rounded-full bg-white/5 animate-pulse" />
            </div>
          </div>
        </div>

        {/* 4. Progress System Skeleton */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="w-14 h-2 bg-white/5 rounded animate-pulse" />
            <div className="w-10 h-2 bg-teal-500/10 rounded animate-pulse" />
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-white/10 rounded-full animate-pulse" />
          </div>
        </div>

        {/* 5. Requirements Tags Skeleton */}
        <div className="flex gap-2 pt-2">
          <div className="w-12 h-5 bg-white/5 border border-white/5 rounded-md animate-pulse" />
          <div className="w-16 h-5 bg-white/5 border border-white/5 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
};
