import React from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
  AlertTriangle,
  GripVertical,
} from 'lucide-react';
import { formatDate, formatTime, isPast, isToday } from '../../utils/dateUtils';
import { useTasks } from '../../context/TaskContext';

export const TaskCard = ({ task, onEdit }) => {
  const { toggleDone, deleteTask } = useTasks();

  const isDone = task.status === 'done';
  const hasDueDate = !!task.dueDate;
  const isOverdue = hasDueDate && !isDone && isPast(task.dueDate);
  const dueToday = hasDueDate && isToday(task.dueDate);

  const priorityStyles = {
    Low: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    Medium: 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    High: 'text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800',
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task._id);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`group glass-card rounded-2xl p-4 border transition-all duration-200 hover:shadow-lg hover:border-blue-400/50 cursor-grab active:cursor-grabbing relative ${
        isDone ? 'bg-slate-50/60 dark:bg-slate-900/40 opacity-80' : ''
      }`}
    >
      {/* Top Header: Category & Priority */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <GripVertical className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {task.category || 'Work'}
          </span>
        </div>

        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
            priorityStyles[task.priority] || priorityStyles.Medium
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Task Title & Quick Done Toggle */}
      <div className="flex items-start gap-2.5 my-2">
        <button
          onClick={() => toggleDone(task._id)}
          className="mt-0.5 shrink-0 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          title={isDone ? 'Mark as Incomplete' : 'One-click Mark as Done'}
        >
          {isDone ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50 dark:fill-emerald-950" />
          ) : (
            <Circle className="w-5 h-5 hover:text-blue-500" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h4
            className={`text-sm font-semibold text-slate-900 dark:text-white leading-snug break-words ${
              isDone ? 'line-through text-slate-400 dark:text-slate-500' : ''
            }`}
          >
            {task.title}
          </h4>

          {task.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Due Date & Timestamps */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
        {hasDueDate ? (
          <div
            className={`flex items-center gap-1.5 font-medium ${
              isDone
                ? 'text-slate-400 dark:text-slate-500'
                : isOverdue
                ? 'text-rose-600 dark:text-rose-400 font-semibold'
                : dueToday
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {isOverdue && !isDone ? (
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <Calendar className="w-3.5 h-3.5 shrink-0" />
            )}
            <span>
              {formatDate(task.dueDate)} {formatTime(task.dueDate)}
            </span>
            {isOverdue && !isDone && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                Overdue
              </span>
            )}
          </div>
        ) : (
          <span className="text-slate-400 text-[11px]">No due date</span>
        )}

        {/* Action Buttons: Edit / Delete */}
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Edit Task"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Delete task "${task.title}"?`)) {
                deleteTask(task._id);
              }
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Completed Timestamp for Done Tasks */}
      {isDone && task.completedAt && (
        <div className="mt-2 text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Completed on {formatDate(task.completedAt)} at {formatTime(task.completedAt)}</span>
        </div>
      )}
    </div>
  );
};
