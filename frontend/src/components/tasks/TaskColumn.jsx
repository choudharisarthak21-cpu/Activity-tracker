import React, { useState } from 'react';
import { Plus, ListTodo, CheckCircle2, CalendarDays } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { EmptyState } from '../common/EmptyState';
import { useTasks } from '../../context/TaskContext';

export const TaskColumn = ({
  status,
  title,
  icon: Icon,
  tasks,
  onAddNew,
  onEditTask,
}) => {
  const { updateTaskStatus } = useTasks();
  const [isOver, setIsOver] = useState(false);

  const columnConfig = {
    todo: {
      badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
      borderAccent: 'border-t-4 border-t-amber-500',
      emptyMessage: 'No pending tasks for today. Click + to add one!',
    },
    done: {
      badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
      borderAccent: 'border-t-4 border-t-emerald-500',
      emptyMessage: 'No completed tasks yet. Mark tasks as done to celebrate!',
    },
    planned: {
      badgeBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
      borderAccent: 'border-t-4 border-t-purple-500',
      emptyMessage: 'No future planned tasks scheduled.',
    },
  };

  const config = columnConfig[status] || columnConfig.todo;

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      updateTaskStatus(taskId, status);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`glass-panel rounded-2xl p-4 flex flex-col h-full min-h-[500px] border transition-all duration-200 ${
        config.borderAccent
      } ${isOver ? 'drag-over' : ''}`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {Icon && <Icon className="w-4 h-4" />}
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.badgeBg}`}
          >
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => onAddNew(status)}
          className="p-1 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Add task to ${title}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Task List or Empty State */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {tasks.length === 0 ? (
          <EmptyState
            title={`No ${title} Tasks`}
            message={config.emptyMessage}
            onAction={() => onAddNew(status)}
            actionLabel="Add Task"
          />
        ) : (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={onEditTask} />
          ))
        )}
      </div>
    </div>
  );
};
