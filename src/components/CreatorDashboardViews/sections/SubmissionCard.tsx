import React from "react";
import {
  IconClock,
  IconCircleCheck,
  IconCircleX,
  IconAlertTriangle,
  IconExternalLink,
} from "@tabler/icons-react";

interface SubmissionCardProps {
  submission: {
    campaignTitle: string;
    brandName: string;
    status: "Pending" | "Approved" | "Rejected" | "Flagged";
    payout: number;
    submittedDate: string;
    contentLink: string;
    thumbnail?: string;
  };
}

const statusStyles = {
  Pending: { color: "text-amber-400", bg: "bg-amber-400/10", icon: IconClock },
  Approved: {
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    icon: IconCircleCheck,
  },
  Rejected: { color: "text-red-400", bg: "bg-red-400/10", icon: IconCircleX },
  Flagged: {
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    icon: IconAlertTriangle,
  },
};

const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission }) => {
  const StatusIcon = statusStyles[submission.status].icon;

  return (
    <div className="group relative bg-[#11141A] border border-white/[0.05] rounded-[24px] p-4 hover:border-teal-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/5">
      <div className="flex gap-4">
        {/* Visual Content Preview */}
        <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
          {submission.thumbnail ? (
            <img
              src={submission.thumbnail}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt="Content"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-teal-400/5">
              <StatusIcon
                className={`w-8 h-8 ${statusStyles[submission.status].color} opacity-40`}
              />
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-start justify-between">
              <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest truncate mb-0.5">
                {submission.brandName}
              </p>
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusStyles[submission.status].bg}`}
              >
                <StatusIcon
                  size={12}
                  className={statusStyles[submission.status].color}
                />
                <span
                  className={`text-[9px] font-black uppercase tracking-tighter ${statusStyles[submission.status].color}`}
                >
                  {submission.status}
                </span>
              </div>
            </div>
            <h3 className="text-sm font-bold text-white leading-tight line-clamp-1 group-hover:text-teal-400 transition-colors">
              {submission.campaignTitle}
            </h3>
          </div>

          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-gray-500 uppercase">
                Est. Payout
              </p>
              <p className="text-sm font-black text-white">
                UGX {submission.payout.toLocaleString()}
              </p>
            </div>

            <a
              href={submission.contentLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-xl border border-white/5"
            >
              View Post <IconExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
