import {
  IconCircleCheck,
  IconGitPullRequest,
  IconMessageDots,
  IconFlame,
  IconJoinStraight,
  IconJoinBevel,
  IconUser,
  IconUsersPlus,
  IconRefresh,
} from "@tabler/icons-react";

const activities = [
  {
    id: 1,
    title: "Campaign Milestone Reached",
    desc: "Your Campaign 'Tredstone upto the sky' successfully hit 10M views across all platforms.",
    when: "2 hours ago",
    icon: <IconCircleCheck className="text-green-500" size={20} />,
    color: "bg-green-100",
  },
  {
    id: 2,
    title: "New Creators Joined",
    desc: "Alex, Bob, John, Noah, 12+ others joined your newly launched Campaign 'Tredstone upto the sky' ",
    when: "5 hours ago",
    icon: <IconUsersPlus className="text-blue-500" size={20} />,
    color: "bg-blue-100",
  },
  {
    id: 3,
    title: "Brand Update",
    desc: "Brand name and description has been Updated successfully",
    when: "Yesterday",
    icon: <IconRefresh className="text-purple-500" size={20} />,
    color: "bg-purple-100",
  },
];

export default function ActivitySection() {
  return (
    <section className="w-full max-w-4xl p-8 bg-[#0D1117] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
      {/* Header with Brand Teal Icon */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
          <IconFlame className="text-teal-400" size={20} />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Recent Activities
        </h2>
      </div>

      {/* Timeline with Teal Gradient Line */}
      <div className="space-y-10 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-teal-500/20 before:to-transparent">
        {activities.map((item) => (
          <div key={item.id} className="relative pl-12 group">
            {/* Timeline Dot: Kreaterly style (Dark bg + Teal border) */}
            <div
              className={`absolute left-0 p-2 rounded-xl border border-white/10 bg-[#161B22] shadow-xl transition-all duration-300 group-hover:border-teal-500/50 group-hover:scale-110 ${item.color}`}
            >
              {item.icon}
            </div>

            {/* Content Section */}
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <h3 className="font-bold text-white leading-tight transition-colors group-hover:text-teal-400">
                {item.title}
              </h3>
              <time className="text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap bg-white/5 px-2 py-0.5 rounded-md">
                {item.when}
              </time>
            </div>

            <p className="mt-2 text-sm text-gray-400 leading-relaxed max-w-md">
              {item.desc}
            </p>

            {/* Subtle Hover Glow */}
            <div className="absolute -inset-y-2 -inset-x-4 z-[-1] rounded-2xl bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </section>
  );
}
