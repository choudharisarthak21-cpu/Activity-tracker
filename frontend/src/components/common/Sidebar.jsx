import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  BarChart3,
  CheckCircle,
  Clock,
  CalendarDays,
  Plus,
  X,
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

export const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose, onOpenTaskModal }) => {
  const { stats } = useTasks();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Board', icon: LayoutDashboard },
    { id: 'calendar', label: 'Calendar View', icon: Calendar },
    { id: 'analytics', label: 'Analytics & Trends', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[61px] left-0 h-screen lg:h-[calc(100vh-61px)] w-64 glass-panel border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between p-4 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between lg:hidden pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold text-base text-slate-800 dark:text-white">Navigation</span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => {
              onOpenTaskModal();
              if (onClose) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
              Views
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Activity Quick Stats in Sidebar */}
          <div className="pt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2.5">
              Quick Counts
            </p>
            <div className="space-y-2 px-1">
              <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg bg-amber-500/5 text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> To Do
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{stats.todo}</span>
              </div>
              <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg bg-emerald-500/5 text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Done
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{stats.done}</span>
              </div>
              <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg bg-purple-500/5 text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-purple-500" /> Planned
                </span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{stats.planned}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 px-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span>Activity Tracker v1.0</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </aside>
    </>
  );
};
