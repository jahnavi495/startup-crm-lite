import React, { useMemo } from 'react';

const STAGES = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

const STAGE_COLORS = {
  New: 'bg-slate-400',
  Contacted: 'bg-warning',
  'Meeting Scheduled': 'bg-indigo-500',
  'Proposal Sent': 'bg-primary',
  Won: 'bg-success',
  Lost: 'bg-danger'
};

/**
 * @typedef {Object} Lead
 * @property {string} id - Unique lead identifier.
 * @property {string} name - Contact person's name.
 * @property {string} company - Organization name.
 * @property {number} value - Financial opportunity value.
 * @property {string} status - Pipeline status.
 */

/**
 * @typedef {Object} PipelineOverviewProps
 * @property {Lead[]} leads - List of leads displayed in the overview.
 */

/**
 * PipelineOverview Component
 * Displays a horizontal pipeline bar with status segments and supporting metric cards.
 *
 * @param {PipelineOverviewProps} props
 */
const PipelineOverview = ({ leads }) => {
  const totalLeads = leads.length;

  const stageStats = useMemo(() => {
    return STAGES.map((stage) => {
      const stageLeads = leads.filter((lead) => lead.status === stage);
      const value = stageLeads.reduce((sum, lead) => sum + lead.value, 0);
      const percentage = totalLeads > 0 ? (stageLeads.length / totalLeads) * 100 : 0;

      return {
        name: stage,
        count: stageLeads.length,
        value,
        percentage
      };
    });
  }, [leads, totalLeads]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Pipeline Overview
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            Stage distribution across the funnel
          </h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {totalLeads} opportunities
        </span>
      </div>

      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        {stageStats.map((stat) => {
          if (stat.count === 0) return null;
          return (
            <div
              key={stat.name}
              className={`${STAGE_COLORS[stat.name]} h-full`}
              style={{ width: `${stat.percentage}%` }}
              title={`${stat.name}: ${stat.count} leads`}
            />
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {stageStats.map((stat) => (
          <div key={stat.name} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/60">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${STAGE_COLORS[stat.name]}`} />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{stat.name}</span>
            </div>
            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{stat.count}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{Math.round(stat.percentage)}% of pipeline</p>
            <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300">{formatCurrency(stat.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineOverview;
