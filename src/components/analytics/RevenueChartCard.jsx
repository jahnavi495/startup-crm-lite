import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { CHART_THEME } from '../../constants/analyticsColors';
import { getRevenueByMonth } from '../../utils/analyticsHelpers';

const formatRupeeShort = (val) => {
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(1)}L`; // Lakhs format
  }
  if (val >= 1000) {
    return `₹${(val / 1000).toFixed(0)}k`;
  }
  return `₹${val}`;
};

const formatRupeeFull = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * RevenueChartCard Component
 * Displays a smooth area chart of won revenue over the last 6 months.
 */
const RevenueChartCard = ({ leads }) => {
  const chartData = useMemo(() => getRevenueByMonth(leads), [leads]);

  return (
    <div className="p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      
      {/* Card Header */}
      <div>
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
          Revenue Growth Trend
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
          Monthly won revenue from closed deals over the last 6 months.
        </p>
      </div>

      {/* Chart Canvas */}
      <div className="h-52 w-full">
        {chartData && chartData.some(d => d.value > 0) ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_THEME.success} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={CHART_THEME.success} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:hidden" />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" className="hidden dark:block" />
              
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis 
                stroke="#94A3B8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={formatRupeeShort} 
              />
              
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-3 bg-slate-900/95 dark:bg-slate-950 border border-slate-800 rounded-xl shadow-lg text-white text-xs space-y-0.5">
                        <p className="font-bold">{data.name} Revenue</p>
                        <p className="text-green-400 font-semibold">{formatRupeeFull(payload[0].value)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={CHART_THEME.success} 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-slate-400 dark:text-slate-600">
            No closed-won revenue recorded for this period.
          </div>
        )}
      </div>

    </div>
  );
};

export default RevenueChartCard;
