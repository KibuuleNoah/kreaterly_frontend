import { IconExternalLink, IconUser } from "@tabler/icons-react";
import { motion } from "framer-motion";
import type React from "react";

const VideoCard: React.FC<{ video: any; idx: number }> = ({ video, idx }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: idx * 0.1 }}
    whileHover={{ x: 10 }}
    className="relative  bg-[#11141A] border border-teal-500/20 rounded-2xl p-5 transition-all duration-300 hover:border-teal-500 hover:bg-[#161a22]"
  >
    <span className="absolute top-2 right-2 text-sm font-black text-teal-500/50 w-6">
      0{idx}
    </span>
    <div className="group flex items-center justify-between w-full">
      {/* Left Side: Rank & Creator Info */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 shrink-0">
          <IconUser size={20} />
        </div>

        <div className="overflow-hidden">
          <h4 className="text-white font-bold text-sm truncate group-hover:text-teal-500 transition-colors">
            {video.title}
          </h4>
          <p className="text-gray-500 text-xs truncate">
            @{video.creator || "username"}
          </p>
        </div>
      </div>

      {/* Right Side: Simple Stats */}
      <div className="flex items-center gap-8 shrink-0 ml-4">
        <div className="text-right">
          <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
            Views
          </p>
          <p className="text-sm font-bold text-white">{video.views}</p>
        </div>
      </div>
    </div>
    <div className="text-sm flex justify-center">
      <a className="text-teal-500">
        <IconExternalLink size={15} />
      </a>
    </div>
  </motion.div>
);

// Organized Vertical stack of 3 horizontal cards
// const VideoList = ({ videos }: { videos: any[] }) => (
//   <div className="flex flex-col gap-3 w-full max-w-2xl">
//     {videos.slice(0, 3).map((video, i) => (
//       <VideoCard key={i} video={video} index={i} />
//     ))}
//   </div>
// );
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
          <VideoCard key={idx} video={video} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default CampaignTopVideos;
