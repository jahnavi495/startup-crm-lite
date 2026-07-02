import React from 'react';
import { Plus, Users, Download, ChevronRight } from 'lucide-react';

/**
 * @typedef {Object} QuickActionsProps
 * @property {Function} onAddLeadClick - Callback used when the add lead action is pressed.
 */

/**
 * QuickActions Component
 * Renders three primary actions for the CRM dashboard.
 *
 * @param {QuickActionsProps} props
 */
const QuickActions = ({ onAddLeadClick }) => {
  const actions = [
    {
      title: 'Add New Lead',
      description: 'Register a new opportunity contact',
      icon: Plus,
      color: 'bg-primary',
      accent: 'bg-primary/10 text-primary',
      onClick: onAddLeadClick
    },
    {
      title: 'View All Leads',
      description: 'Open the full lead directory',
      icon: Users,
      color: 'bg-success',
      accent: 'bg-success/10 text-success',
      path: '/leads'
    },
    {
      title: 'Export Data',
      description: 'Download the current lead list',
      icon: Download,
      color: 'bg-warning',
      accent: 'bg-warning/10 text-warning',
      onClick: () => window.alert('Export feature will be connected in the next phase.')
    }
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Quick Actions
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
          Common workflows in one place
        </h3>
      </div>

      <div className="mt-5 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              type="button"
              onClick={action.onClick}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/70 dark:hover:border-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-xl p-2.5 text-white ${action.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{action.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{action.description}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
