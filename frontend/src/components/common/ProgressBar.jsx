import React from 'react';

export const ProgressBar = ({ percentage = 0, completed = 0, total = 0, label = 'Overall Progress' }) => {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div className="glass-card rounded-2xl p-5 border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {label}
          </span>
          {total > 0 && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({completed}/{total} completed)
            </span>
          )}
        </div>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {clamped}%
        </span>
      </div>

      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700/50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
