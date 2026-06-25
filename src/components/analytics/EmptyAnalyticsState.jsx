import React from 'react';
import { BarChart3, Plus } from 'lucide-react';

/**
 * EmptyAnalyticsState Component
 * Renders when there are no leads to analyze in the current viewport/filter.
 */
const EmptyAnalyticsState = ({ onAddLeadClick }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark shadow-sm min-h-[400px] transition-all duration-200">
      <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-950/40 text-primary mb-5 animate-pulse">
        <BarChart3 size={40} strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        No analytics available yet
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
        Add your first lead or adjust your date filter range to start tracking business performance.
      </p>
      <button
        type="button"
        onClick={onAddLeadClick}
        className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs hover:shadow-md cursor-pointer transition-all duration-150 active:scale-98 focus:outline-hidden"
      >
        <Plus size={16} />
        <span>Add Lead</span>
      </button>
    </div>
  );
};

export default EmptyAnalyticsState;
