import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * @typedef {Object} StatsCardProps
 * @property {string} title - KPI label shown above the metric.
 * @property {string|number} value - Main numeric or text metric.
 * @property {React.ElementType} icon - Lucide icon component.
 * @property {number} change - Percentage change vs the previous month.
 * @property {string} color - Tailwind color token used for the card accent.
 */

/**
 * StatsCard Component
 * Renders a premium KPI card with an icon, a large value, and a change indicator.
 *
 * @param {StatsCardProps} props
 */
const StatsCard = ({ title, value, icon: Icon, change, color = 'bg-primary' }) => {
  const isPositive = change >= 0;

  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900`}> 
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {value}
          </p>
        </div>
        <div className={`rounded-2xl p-2.5 ${color} text-white shadow-sm`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm font-medium">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${isPositive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
          {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          <span>{isPositive ? '+' : ''}{change}%</span>
        </span>
        <span className="text-slate-500 dark:text-slate-400">vs last month</span>
      </div>
    </div>
  );
};

export default StatsCard;
