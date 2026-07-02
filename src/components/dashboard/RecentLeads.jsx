import React, { useMemo } from 'react';

/**
 * @typedef {Object} Lead
 * @property {string} id - Unique lead identifier.
 * @property {string} name - Contact person's name.
 * @property {string} company - Organization name.
 * @property {string} status - Pipeline status.
 * @property {string} createdAt - ISO date string when the lead was created.
 */

/**
 * @typedef {Object} RecentLeadsProps
 * @property {Lead[]} leads - Lead list used to render the recent entries.
 */

/**
 * RecentLeads Component
 * Lists the five most recently created leads in a compact table.
 *
 * @param {RecentLeadsProps} props
 */
const RecentLeads = ({ leads }) => {
  const recentLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [leads]);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Recent Leads
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            Latest opportunities added
          </h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          Last 5
        </span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Company</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Added</th>
            </tr>
          </thead>
          <tbody>
            {recentLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-slate-100 last:border-b-0 dark:border-slate-800">
                <td className="py-3 font-medium text-slate-900 dark:text-white">{lead.name}</td>
                <td className="py-3 text-slate-600 dark:text-slate-300">{lead.company}</td>
                <td className="py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${lead.status === 'Won' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : lead.status === 'Lost' ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-3 text-right text-slate-500 dark:text-slate-400">
                  {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeads;
