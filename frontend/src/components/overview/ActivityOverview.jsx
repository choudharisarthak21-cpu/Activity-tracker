import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

export const ActivityOverview = () => {
  const { stats, tasks } = useTasks();

  const weeklyTrend = stats.weeklyTrend || [];
  const maxWeeklyCount = Math.max(
    ...weeklyTrend.map((d) => Math.max(d.completed, d.created, 1))
  );

  const categoryEntries = Object.entries(stats.categoryCounts || {});
  const totalCategoryTasks = categoryEntries.reduce((sum, [_, count]) => sum + count, 0);

  const priorities = [
    { label: 'High', count: stats.priorityCounts?.High || 0, color: 'bg-rose-500', barBg: 'bg-rose-500/20' },
    { label: 'Medium', count: stats.priorityCounts?.Medium || 0, color: 'bg-amber-500', barBg: 'bg-amber-500/20' },
    { label: 'Low', count: stats.priorityCounts?.Low || 0, color: 'bg-emerald-500', barBg: 'bg-emerald-500/20' },
  ];

  const totalPriorityTasks = priorities.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Productivity & Activity Overview
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Real-time metrics, completion trends, and category performance
        </p>
      </div>

      {/* Highlights Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Completion Rate
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.completionRate}%
            </h3>
            <p className="text-[11px] text-slate-400">
              {stats.done} of {stats.total} tasks completed
            </p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Weekly Activity
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {weeklyTrend.reduce((sum, d) => sum + d.completed, 0)} Done
            </h3>
            <p className="text-[11px] text-slate-400">
              Over the last 7 recorded days
            </p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Productivity Status
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.completionRate >= 75 ? 'Outstanding' : stats.completionRate >= 40 ? 'On Track' : 'Starting Up'}
            </h3>
            <p className="text-[11px] text-slate-400">
              Keep checking off daily goals
            </p>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: 7-Day Completion Trend */}
        <div className="glass-panel rounded-2xl p-6 border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                7-Day Activity Trend
              </h3>
              <div className="flex items-center gap-3 text-[11px] font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Completed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Created
                </span>
              </div>
            </div>

            {/* Custom Bar Visualization */}
            <div className="pt-6 pb-2">
              <div className="grid grid-cols-7 gap-3 h-48 items-end border-b border-slate-200 dark:border-slate-800 pb-2">
                {weeklyTrend.map((item, idx) => {
                  const compHeight = Math.max(12, Math.round((item.completed / maxWeeklyCount) * 100));
                  const createHeight = Math.max(12, Math.round((item.created / maxWeeklyCount) * 100));

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="flex items-end gap-1 w-full justify-center">
                        {/* Completed bar */}
                        <div
                          style={{ height: `${item.completed > 0 ? compHeight : 4}%` }}
                          className={`w-3.5 sm:w-4 rounded-t-lg transition-all duration-500 ${
                            item.completed > 0 ? 'bg-emerald-500 shadow-sm' : 'bg-slate-200 dark:bg-slate-800'
                          }`}
                          title={`${item.completed} completed on ${item.day}`}
                        />
                        {/* Created bar */}
                        <div
                          style={{ height: `${item.created > 0 ? createHeight : 4}%` }}
                          className={`w-3.5 sm:w-4 rounded-t-lg transition-all duration-500 ${
                            item.created > 0 ? 'bg-blue-500 shadow-sm' : 'bg-slate-200 dark:bg-slate-800'
                          }`}
                          title={`${item.created} created on ${item.day}`}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-2 text-center">
            Daily task momentum over the last seven days
          </p>
        </div>

        {/* Chart 2: Category Breakdown */}
        <div className="glass-panel rounded-2xl p-6 border flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Layers className="w-4 h-4 text-purple-500" />
              Category Breakdown
            </h3>

            {categoryEntries.length === 0 ? (
              <p className="text-xs text-slate-400 py-10 text-center">No categories recorded yet.</p>
            ) : (
              <div className="space-y-3.5 pt-2">
                {categoryEntries.map(([cat, count]) => {
                  const pct = totalCategoryTasks > 0 ? Math.round((count / totalCategoryTasks) * 100) : 0;
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {cat}
                        </span>
                        <span className="font-bold text-slate-500 dark:text-slate-400">
                          {count} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          style={{ width: `${pct}%` }}
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Priority Distribution Pills */}
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Priority Distribution
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {priorities.map((p) => {
                const pct = totalPriorityTasks > 0 ? Math.round((p.count / totalPriorityTasks) * 100) : 0;
                return (
                  <div key={p.label} className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 glass-card text-center">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                      {p.label}
                    </span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {p.count}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
