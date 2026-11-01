import React from 'react';
import {
  CheckCircle2,
  Calendar,
  BarChart3,
  MoveRight,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
  Download,
  BellRing,
} from 'lucide-react';

export const LandingPage = ({ onOpenAuth }) => {
  return (
    <div className="space-y-20 py-8 md:py-16">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Production-Ready Activity Tracker 2.0</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          Organize Your Day.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
            Track Every Milestone.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The ultimate productivity companion built for professionals. Manage today's tasks, schedule future plans, celebrate completed achievements, and monitor your personal momentum with rich analytics.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <button
            onClick={() => onOpenAuth('signup')}
            className="px-7 py-3.5 text-sm font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Get Started for Free</span>
            <MoveRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenAuth('login')}
            className="px-7 py-3.5 text-sm font-semibold rounded-2xl glass-panel text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Sign In to Dashboard
          </button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free & Open Source
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" /> Drag & Drop Kanban
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-500" /> JWT Protected
          </span>
        </div>
      </section>

      {/* Interactive Mock Preview / Board Showcase */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="glass-panel rounded-3xl p-4 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: To Do */}
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between font-bold text-xs text-amber-600 dark:text-amber-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> To Do
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-[10px]">
                  2 Today
                </span>
              </div>
              <div className="p-3 rounded-xl glass-card text-xs space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-semibold text-slate-500">Design</span>
                  <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 text-[9px] font-bold">
                    HIGH
                  </span>
                </div>
                <p className="font-bold text-slate-800 dark:text-white">Finalize Mobile App UX</p>
                <p className="text-slate-400 text-[11px]">Due today at 4:00 PM</p>
              </div>
              <div className="p-3 rounded-xl glass-card text-xs space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-semibold text-slate-500">Backend</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-700 text-[9px] font-bold">
                    MED
                  </span>
                </div>
                <p className="font-bold text-slate-800 dark:text-white">Implement JWT APIs</p>
                <p className="text-slate-400 text-[11px]">Due today at 7:00 PM</p>
              </div>
            </div>

            {/* Column 2: Done */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between font-bold text-xs text-emerald-600 dark:text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Done
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[10px]">
                  Completed
                </span>
              </div>
              <div className="p-3 rounded-xl glass-card text-xs space-y-1.5 opacity-80">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-semibold text-slate-500">DevOps</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 text-[9px] font-bold">
                    LOW
                  </span>
                </div>
                <p className="font-bold line-through text-slate-400">Setup MongoDB Cluster</p>
                <p className="text-emerald-600 text-[10px]">Completed with Confetti 🎉</p>
              </div>
            </div>

            {/* Column 3: Planned */}
            <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-3">
              <div className="flex items-center justify-between font-bold text-xs text-purple-600 dark:text-purple-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Planned
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-[10px]">
                  Upcoming
                </span>
              </div>
              <div className="p-3 rounded-xl glass-card text-xs space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-semibold text-slate-500">Marketing</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-700 text-[9px] font-bold">
                    MED
                  </span>
                </div>
                <p className="font-bold text-slate-800 dark:text-white">Product Hunt Launch</p>
                <p className="text-purple-600 text-[11px]">Scheduled for Next Week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Built with Every Feature You Need
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            A complete suite of modern tools to keep you in flow state
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Drag & Drop Kanban
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Effortlessly reorder and move tasks between To Do, Done, and Planned columns with intuitive drag and drop interactions.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Interactive Calendar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Visualize monthly schedules, view planned deliverables by date, and schedule future commitments in a single click.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Productivity Analytics
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Review weekly activity trends, priority distributions, and category breakdowns to continuously optimize your workflow.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <BellRing className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Browser Reminders
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Get in-app toasts and native browser notification alerts for upcoming due dates and overdue tasks before deadlines hit.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Export to PDF & CSV
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Download clean spreadsheet spreadsheets or formatted PDF executive reports containing all tasks, statuses, and stats.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Production Full-Stack
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Engineered with React Vite, Express REST APIs, MongoDB Mongoose ODM, JWT authentication, and Docker container support.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center space-y-5 border bg-gradient-to-br from-blue-600/10 via-indigo-500/5 to-purple-600/10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Ready to Take Control of Your Daily Activities?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Join thousands of productive individuals who start their mornings with Activity Tracker.
          </p>
          <div>
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-8 py-3.5 text-sm font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              Start Tracking Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-6 border-t border-slate-200/50 dark:border-slate-800/50">
        <p>© 2026 Activity Tracker. Built with React (Vite), Tailwind CSS, Node.js, Express & MongoDB.</p>
      </footer>
    </div>
  );
};
