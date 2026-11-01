import React from 'react';

export const TaskCardSkeleton = () => (
  <div className="glass-card rounded-2xl p-4 border animate-pulse space-y-3">
    <div className="flex items-center justify-between">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-14" />
    </div>
    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24" />
      <div className="flex gap-2">
        <div className="h-6 w-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
        <div className="h-6 w-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
    </div>
  </div>
);

export const ColumnSkeleton = () => (
  <div className="flex flex-col gap-3">
    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-32 animate-pulse mb-1" />
    <TaskCardSkeleton />
    <TaskCardSkeleton />
  </div>
);
