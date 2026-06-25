
import React from 'react';

/**
 * LoadingSkeleton Component
 * Provides a highly polished skeleton loading screen with pulsing animations.
 */
const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 1. KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-5 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-2xl shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            </div>
            <div className="h-7 w-24 bg-slate-250 dark:bg-slate-700 rounded" />
            <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        ))}
      </div>

      {/* 2. Middle Row Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart Skeleton */}
        <div className="p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-2xl shadow-xs space-y-4">
          <div className="h-5 w-40 bg-slate-255 dark:bg-slate-850 rounded" />
          <div className="flex items-center justify-center py-6">
            <div className="h-44 w-44 rounded-full border-[16px] border-slate-200 dark:border-slate-800 flex items-center justify-center">
              <div className="h-10 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        </div>

        {/* Funnel Chart Skeleton */}
        <div className="p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-2xl shadow-xs space-y-4">
          <div className="h-5 w-40 bg-slate-255 dark:bg-slate-850 rounded" />
          <div className="space-y-3 py-4">
            {[95, 80, 65, 45, 30].map((width, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-7 bg-slate-250 dark:bg-slate-750 rounded-lg flex-1" style={{ maxWidth: `${width}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Row Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-2xl shadow-xs space-y-4">
            <div className="h-5 w-48 bg-slate-255 dark:bg-slate-850 rounded" />
            <div className="h-52 bg-slate-100 dark:bg-slate-900/60 rounded-xl flex items-end p-4 gap-2">
              {[50, 80, 45, 90, 60, 75].map((h, idx) => (
                <div key={idx} className="bg-slate-200 dark:bg-slate-850 rounded-md flex-1" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
