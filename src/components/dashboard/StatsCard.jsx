import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatsCard Component
 * Displays a single key performance indicator (KPI) metric box.
 * Alternates colors in light mode (Blue/Black/Blue/Black) and becomes white in dark mode.
 */
const StatsCard = ({ index = 0, title, value, icon: Icon, change }) => {
  const isPositive = change >= 0;
  const isBlue = index % 2 === 0;

  // Class mapping for Figma design rules
  const cardBgClass = isBlue
    ? 'bg-[#007AFF] text-white dark:bg-white dark:text-slate-900'
    : 'bg-[#1C1C1C] text-white dark:bg-white dark:text-slate-900';

  const iconBgClass = 'bg-white/15 text-white dark:bg-slate-100 dark:text-slate-900';

  const trendTagClass = isPositive
    ? 'text-white dark:text-emerald-600'
    : 'text-white dark:text-red-500';

  const subTextClass = 'text-white/70 dark:text-slate-400';

  return (
    <div className={`p-5 border border-transparent dark:border-slate-205/50 rounded-2xl shadow-xs transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between ${cardBgClass}`}>
      {/* Top row: metric title & accent icon container */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider select-none opacity-90">
          {title}
        </span>
        <div className={`p-2 rounded-xl ${iconBgClass}`}>
          <Icon size={16} strokeWidth={2} />
        </div>
      </div>
      
      {/* Big KPI Metric number */}
      <div className="mt-4">
        <h4 className="text-2xl font-black tracking-tight sm:text-3xl">
          {value}
        </h4>
      </div>

      {/* Percentage change trend block */}
      <div className="mt-3.5 flex items-center gap-1.5 text-xs font-semibold">
        <span className={`inline-flex items-center gap-0.5 ${trendTagClass}`}>
          {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          <span>{isPositive ? '+' : ''}{change}%</span>
        </span>
        <span className={`text-[10px] font-medium ${subTextClass}`}>
          vs last month
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
