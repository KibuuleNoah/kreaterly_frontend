import { IconBrandInstagram, IconBrandTiktok, IconBrandYoutube } from '@tabler/icons-react';
import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell
} from 'recharts';

interface ChartDataPoint {
  date: string;
  views: number;
  engagement: number;
}


const PERFORMANCE_DATA: ChartDataPoint[] = [
  { date: 'Mon', views: 4000, engagement: 2400 },
  { date: 'Tue', views: 3000, engagement: 1398 },
  { date: 'Wed', views: 2000, engagement: 9800 },
  { date: 'Thu', views: 2780, engagement: 3908 },
  { date: 'Fri', views: 1890, engagement: 4800 },
  { date: 'Sat', views: 2390, engagement: 3800 },
  { date: 'Sun', views: 3490, engagement: 4300 },
];


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="text-slate-400 text-xs font-medium mb-1">{label}</p>
        <p className="text-[#2dd4bf] text-sm font-bold">{payload[0].value.toLocaleString()} Views</p>
      </div>
    );
  }
  return null;
};

export const PerformanceChart: React.FC = () => {
  return (
    
    <div className="h-[350px] w-full bg-[#0D1117] border border-white/5 p-6 rounded-3xl shadow-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          {/* Modified: Grid color matches brand subtle borders */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
          
          {/* Modified: Axis tick colors match brand secondary text */}
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          {/* UNTOUCHED: Plot colors preserved */}
          <Area
            type="monotone"
            dataKey="views"
            stroke="#2dd4bf"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorViews)"
          />
          <Area
            type="monotone"
            dataKey="engagement"
            stroke="#8b5cf6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorEngagement)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};



/** 
 * TypeScript Interfaces for Data & Config
 */
interface PlatformData {
  name: string;
  tiktok: number;
  youtube: number;
  instagram: number;
  // Allow for dynamic keys if you add more platforms later
  [key: string]: string | number;
}

interface PlatformConfig {
  id: keyof Omit<PlatformData, 'name'>;
  color: string;
  icon: React.ReactNode;
  label: string;
}

export const SocialAnalytics: React.FC = () => {
  // 1. Centralized Platform Configuration
  const platforms: PlatformConfig[] = [
    { id: 'tiktok', color: '#ffffff', icon: <IconBrandTiktok/>, label: 'TikTok' },
    { id: 'youtube', color: '#ff0000', icon: <IconBrandYoutube/>, label: 'YouTube' },
    { id: 'instagram', color: '#0ff0f0', icon: <IconBrandInstagram />, label: 'Instagram' },
  ];

  const data: PlatformData[] = [
    { name: 'Week 1', tiktok: 4000, youtube: 2400, instagram: 2400 },
    { name: 'Week 2', tiktok: 3000, youtube: 1398, instagram: 2210 },
    { name: 'Week 3', tiktok: 2000, youtube: 9800, instagram: 2290 },
  ];

  // Calculate totals for a modern "KPI" header
  const totals = useMemo(() => {
    return platforms.reduce((acc, p) => {
      acc[p.id] = data.reduce((sum, item) => sum + (item[p.id] as number), 0);
      return acc;
    }, {} as Record<string, number>);
  }, [data]);

  return (
    
<div className="w-full max-w-5xl bg-[#0D1117] border border-white/5 rounded-3xl shadow-2xl overflow-hidden font-sans text-white">
      
      {/* Header with KPI Cards */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white">Channel Growth</h3>
          <p className="text-sm text-gray-400 mt-1">Aggregated performance across 3 networks</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[420px] w-full group">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {/* Ensure platforms.color includes your Brand Teal (#14b8a6) */}
              {platforms.map((p) => (
                <linearGradient key={p.id} id={`${p.id}Grad`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={p.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={p.color} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>

            {/* Subtler grid for a cleaner look */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
            />

            <Tooltip 
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
              contentStyle={{ 
                backgroundColor: '#0D1117', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '16px',
                padding: '12px'
              }}
              itemStyle={{ fontSize: '13px', fontWeight: '500' }}
            />
            
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle"
              wrapperStyle={{ paddingBottom: '30px', fontSize: '11px', textTransform: 'uppercase', color: '#9ca3af' }}
            />

            {platforms.map((p, index) => (
              <Area 
                key={p.id}
                type="monotone" 
                dataKey={p.id} 
                stroke={p.color} // Make sure this is #14b8a6 in your platforms array
                strokeWidth={3} 
                fillOpacity={1} 
                fill={`url(#${p.id}Grad)`} 
                activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
                animationDuration={1200 + (index * 400)}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


// Kreaterly Brand Configuration
const KREATERLY_TEAL = "#14b8a6";
const KREATERLY_BG = "#0D1117";
const KREATERLY_BORDER = "rgba(255, 255, 255, 0.05)";

export const ChannelGrowthChart = ({ data }) => {
  return (
    <div className="w-full p-8 bg-[#0D1117] border border-white/5 rounded-3xl shadow-2xl overflow-hidden font-sans text-white">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white">Channel Growth</h3>
          <p className="text-sm text-gray-400 mt-1">Aggregated performance across Kreaterly networks</p>
        </div>
        
        {/* Quick Legend/Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Live Metrics</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[420px] w-full group">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {/* Kreaterly Signature Gradient */}
              <linearGradient id="kreaterlyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={KREATERLY_TEAL} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={KREATERLY_TEAL} stopOpacity={0}/>
              </linearGradient>
            </defs>

            {/* Subtle Grid - matching brand border feel */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
            />

            <Tooltip 
              cursor={{ stroke: 'rgba(20, 184, 166, 0.2)', strokeWidth: 2 }}
              contentStyle={{ 
                backgroundColor: '#0D1117', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '16px',
                padding: '12px',
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
              }}
              itemStyle={{ fontSize: '13px', fontWeight: '600', color: KREATERLY_TEAL }}
            />
            
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle"
              wrapperStyle={{ paddingBottom: '30px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}
            />

            <Area 
              type="monotone" 
              dataKey="views" // Replace with your data key
              stroke={KREATERLY_TEAL} 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#kreaterlyGrad)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
