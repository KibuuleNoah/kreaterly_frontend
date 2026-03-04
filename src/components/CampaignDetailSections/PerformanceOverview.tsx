import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PerformanceData {
  n: string; // Name/Day
  v: number; // Value
}

interface PerformanceOverviewProps {
  title?: string;
  data?: PerformanceData[];
}

const defaultData: PerformanceData[] = [
  { n: "Mon", v: 400 },
  { n: "Tue", v: 700 },
  { n: "Wed", v: 600 },
  { n: "Thu", v: 900 },
  { n: "Fri", v: 800 },
];

export const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({
  title = "Performance Overview",
  data = defaultData,
}) => {
  return (
    <div className="bg-[#11141A] border border-white/5 p-6 md:p-8 rounded-3xl h-[400px] min-w-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-white">{title}</h3>
        <select className="bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-xs font-bold outline-none text-white cursor-pointer hover:border-teal-500/50 transition-colors">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      {/* Chart Container */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
              dy={10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0D1117",
                border: "1px solid #ffffff10",
                borderRadius: "12px",
                color: "#fff",
              }}
              itemStyle={{ color: "#2DD4BF" }}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#2DD4BF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTeal)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceOverview;
