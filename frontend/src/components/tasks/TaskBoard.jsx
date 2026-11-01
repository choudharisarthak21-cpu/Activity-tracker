import React, { useState } from 'react';
import { ListTodo, CheckCircle2, CalendarDays, Activity } from 'lucide-react';
import { TaskColumn } from './TaskColumn';
import { TaskFilters } from './TaskFilters';
import { ProgressBar } from '../common/ProgressBar';
import { StatCard } from '../common/StatCard';
import { ColumnSkeleton } from '../common/SkeletonLoader';
import { TaskModal } from './TaskModal';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import { getTodayFormatted } from '../../utils/dateUtils';

export const TaskBoard = () => {
  const { user } = useAuth();
  const { tasks, stats, loading } = useTasks();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultColumn, setDefaultColumn] = useState('todo');

  const handleAddNew = (columnStatus = 'todo') => {
    setEditingTask(null);
    setDefaultColumn(columnStatus);
    setModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  // Split tasks into the three columns
  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const doneTasks = tasks.filter((t) => t.status === 'done');
  const plannedTasks = tasks.filter((t) => t.status === 'planned');

  return (
    <div className="space-y-6">
      {/* Header Welcome & Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Friend'} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Today is <span className="font-semibold text-blue-600 dark:text-blue-400">{getTodayFormatted()}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAddNew('todo')}
            className="px-4 py-2 text-xs font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            + Add New Task
          </button>
        </div>
      </div>

      {/* Statistics Cards (Total, Pending/To Do, Completed/Done, Planned) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          count={stats.total}
          icon={Activity}
          badge="All Time"
          color="blue"
        />
        <StatCard
          title="To Do (Pending)"
          count={stats.todo}
          icon={ListTodo}
          badge="Action Required"
          color="amber"
        />
        <StatCard
          title="Completed"
          count={stats.done}
          icon={CheckCircle2}
          badge={`${stats.completionRate}% Done`}
          color="emerald"
        />
        <StatCard
          title="Planned"
          count={stats.planned}
          icon={CalendarDays}
          badge="Scheduled"
          color="purple"
        />
      </div>

      {/* Progress Bar */}
      <ProgressBar
        percentage={stats.completionRate}
        completed={stats.done}
        total={stats.total}
        label="Overall Task Completion"
      />

      {/* Search, Filter, and Sort Toolbar */}
      <TaskFilters />

      {/* Three Main Columns (Kanban Board) */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ColumnSkeleton />
          <ColumnSkeleton />
          <ColumnSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Column 1: To Do */}
          <TaskColumn
            status="todo"
            title="To Do"
            icon={ListTodo}
            tasks={todoTasks}
            onAddNew={handleAddNew}
            onEditTask={handleEditTask}
          />

          {/* Column 2: Done */}
          <TaskColumn
            status="done"
            title="Done"
            icon={CheckCircle2}
            tasks={doneTasks}
            onAddNew={handleAddNew}
            onEditTask={handleEditTask}
          />

          {/* Column 3: Planned */}
          <TaskColumn
            status="planned"
            title="Planned"
            icon={CalendarDays}
            tasks={plannedTasks}
            onAddNew={handleAddNew}
            onEditTask={handleEditTask}
          />
        </div>
      )}

      {/* Task Add / Edit Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTask={editingTask}
        defaultStatus={defaultColumn}
      />
    </div>
  );
};
