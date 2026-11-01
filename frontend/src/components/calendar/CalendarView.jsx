import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import { TaskModal } from '../tasks/TaskModal';
import { formatDate, formatTime } from '../../utils/dateUtils';

export const CalendarView = () => {
  const { tasks, toggleDone } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDayForNewTask, setSelectedDayForNewTask] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of month & total days
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDay(today);
  };

  // Get tasks matching a specific date string (YYYY-MM-DD)
  const getTasksForDate = (dateObj) => {
    const targetStr = dateObj.toISOString().split('T')[0];
    return tasks.filter((t) => {
      if (!t.dueDate) return false;
      const dStr = new Date(t.dueDate).toISOString().split('T')[0];
      return dStr === targetStr;
    });
  };

  const selectedDayTasks = getTasksForDate(selectedDay);

  const daysCells = [];
  // Leading empty cells
  for (let i = 0; i < firstDayIndex; i++) {
    daysCells.push(<div key={`empty-${i}`} className="min-h-[90px] p-2 bg-slate-50/30 dark:bg-slate-900/20 rounded-xl" />);
  }

  const today = new Date();

  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const cellDate = new Date(year, month, day);
    const dayTasks = getTasksForDate(cellDate);
    const isCurrentDay =
      cellDate.getDate() === today.getDate() &&
      cellDate.getMonth() === today.getMonth() &&
      cellDate.getFullYear() === today.getFullYear();

    const isSelected =
      cellDate.getDate() === selectedDay.getDate() &&
      cellDate.getMonth() === selectedDay.getMonth() &&
      cellDate.getFullYear() === selectedDay.getFullYear();

    daysCells.push(
      <div
        key={`day-${day}`}
        onClick={() => setSelectedDay(cellDate)}
        className={`min-h-[95px] p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
          isSelected
            ? 'ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/40 border-blue-400'
            : isCurrentDay
            ? 'bg-blue-50/20 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700'
            : 'glass-card hover:bg-slate-50 dark:hover:bg-slate-800/60'
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
              isCurrentDay
                ? 'bg-blue-600 text-white'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            {day}
          </span>
          {dayTasks.length > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              {dayTasks.length}
            </span>
          )}
        </div>

        {/* Task badges */}
        <div className="mt-1 space-y-1 overflow-hidden">
          {dayTasks.slice(0, 2).map((t) => (
            <div
              key={t._id}
              className={`text-[10px] truncate px-1.5 py-0.5 rounded font-medium ${
                t.status === 'done'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 line-through'
                  : t.priority === 'High'
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              {t.title}
            </div>
          ))}
          {dayTasks.length > 2 && (
            <span className="text-[9px] text-slate-400 font-semibold pl-1">
              +{dayTasks.length - 2} more
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Calendar & Planned Activities
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Visualize your scheduled tasks and dead-lines across the month
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToday}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Today
          </button>
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs font-bold text-slate-800 dark:text-white min-w-[130px] text-center">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid & Selected Day Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Month Calendar Grid (2 Cols) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-4 md:p-6 border">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Day Grid Cells */}
          <div className="grid grid-cols-7 gap-2">{daysCells}</div>
        </div>

        {/* Selected Day Agenda Drawer (1 Col) */}
        <div className="glass-panel rounded-2xl p-5 border flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {selectedDay.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedDayTasks.length} {selectedDayTasks.length === 1 ? 'activity' : 'activities'} scheduled
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedDayForNewTask(selectedDay.toISOString());
                  setModalOpen(true);
                }}
                className="p-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-105"
                title="Schedule task for this day"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* List of Tasks for Selected Day */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {selectedDayTasks.length === 0 ? (
                <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-xs">
                  <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No activities scheduled for this date.</p>
                  <p className="mt-1 text-blue-500 font-semibold cursor-pointer" onClick={() => {
                    setSelectedDayForNewTask(selectedDay.toISOString());
                    setModalOpen(true);
                  }}>
                    + Plan a task
                  </p>
                </div>
              ) : (
                selectedDayTasks.map((t) => (
                  <div
                    key={t._id}
                    className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 glass-card flex items-start gap-2.5"
                  >
                    <button
                      onClick={() => toggleDone(t._id)}
                      className="mt-0.5 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      {t.status === 'done' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-xs font-semibold text-slate-800 dark:text-slate-100 ${
                          t.status === 'done' ? 'line-through text-slate-400 dark:text-slate-500' : ''
                        }`}
                      >
                        {t.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(t.dueDate)}
                        </span>
                        <span>•</span>
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                          {t.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultStatus="planned"
        defaultDate={selectedDayForNewTask}
      />
    </div>
  );
};
