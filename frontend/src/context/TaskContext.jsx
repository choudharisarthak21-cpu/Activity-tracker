import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { taskAPI } from '../services/api';
import { useAuth } from './AuthContext';
import { checkTaskReminders, sendBrowserNotification } from '../utils/notificationUtils';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    todo: 0,
    done: 0,
    planned: 0,
    completionRate: 0,
    categoryCounts: {},
    priorityCounts: { Low: 0, Medium: 0, High: 0 },
    weeklyTrend: [],
  });
  const [loading, setLoading] = useState(false);

  // Search & Filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Notified tasks cache for reminders
  const notifiedTasksRef = useRef(new Set());

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const fetchStats = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await taskAPI.getStats();
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('[TaskContext] Error fetching stats:', err.message);
    }
  }, [isAuthenticated]);

  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await taskAPI.getTasks({
        search: searchQuery,
        priority: selectedPriority !== 'All' ? selectedPriority : '',
        category: selectedCategory !== 'All' ? selectedCategory : '',
        sortBy,
        order: sortOrder,
      });

      if (res.success) {
        setTasks(res.data || []);
      }
    } catch (err) {
      console.error('[TaskContext] Error fetching tasks:', err.message);
      addToast(err.message || 'Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, searchQuery, selectedPriority, selectedCategory, sortBy, sortOrder, addToast]);

  // Initial load and filter change trigger
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
      fetchStats();
    } else {
      setTasks([]);
      setStats({
        total: 0,
        todo: 0,
        done: 0,
        planned: 0,
        completionRate: 0,
        categoryCounts: {},
        priorityCounts: { Low: 0, Medium: 0, High: 0 },
        weeklyTrend: [],
      });
    }
  }, [isAuthenticated, fetchTasks, fetchStats]);

  // Periodic Reminder Check
  useEffect(() => {
    if (!isAuthenticated || tasks.length === 0) return;

    const interval = setInterval(() => {
      const reminders = checkTaskReminders(tasks, notifiedTasksRef.current);
      reminders.forEach((r) => {
        addToast(r.message, r.type === 'overdue' ? 'error' : 'info');
        sendBrowserNotification('Activity Tracker Reminder', {
          body: r.message,
        });
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isAuthenticated, tasks, addToast]);

  const createTask = async (taskData) => {
    try {
      const res = await taskAPI.createTask(taskData);
      if (res.success && res.data) {
        setTasks((prev) => [res.data, ...prev]);
        fetchStats();
        addToast('Task created successfully!', 'success');
        return { success: true, task: res.data };
      }
      return { success: false, message: res.message || 'Failed to create task' };
    } catch (err) {
      addToast(err.message || 'Failed to create task', 'error');
      return { success: false, message: err.message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await taskAPI.updateTask(id, taskData);
      if (res.success && res.data) {
        setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
        fetchStats();
        addToast('Task updated successfully!', 'success');
        return { success: true, task: res.data };
      }
      return { success: false, message: res.message || 'Failed to update task' };
    } catch (err) {
      addToast(err.message || 'Failed to update task', 'error');
      return { success: false, message: err.message };
    }
  };

  const toggleDone = async (id) => {
    try {
      const res = await taskAPI.toggleDone(id);
      if (res.success && res.data) {
        const updated = res.data;
        setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
        fetchStats();

        if (updated.status === 'done') {
          // Trigger confetti animation!
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
          });
          addToast('Task completed! Great job! 🎉', 'success');
        } else {
          addToast('Task marked as to do', 'info');
        }
        return { success: true, task: updated };
      }
      return { success: false };
    } catch (err) {
      addToast(err.message || 'Failed to toggle task status', 'error');
      return { success: false };
    }
  };

  const updateTaskStatus = async (id, newStatus) => {
    try {
      // Optimistic UI update
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
      );

      const res = await taskAPI.updateStatus(id, newStatus);
      if (res.success && res.data) {
        setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
        fetchStats();

        if (newStatus === 'done') {
          confetti({
            particleCount: 45,
            spread: 55,
            origin: { y: 0.7 },
          });
          addToast('Moved to Done! 🚀', 'success');
        } else {
          addToast(`Moved to ${newStatus === 'todo' ? 'To Do' : 'Planned'}`, 'info');
        }
        return { success: true };
      }
      // Revert if failed
      fetchTasks();
      return { success: false };
    } catch (err) {
      fetchTasks();
      addToast(err.message || 'Failed to move task', 'error');
      return { success: false };
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await taskAPI.deleteTask(id);
      if (res.success) {
        setTasks((prev) => prev.filter((t) => t._id !== id));
        fetchStats();
        addToast('Task deleted successfully', 'info');
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      addToast(err.message || 'Failed to delete task', 'error');
      return { success: false };
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loading,
        searchQuery,
        setSearchQuery,
        selectedPriority,
        setSelectedPriority,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        fetchTasks,
        fetchStats,
        createTask,
        updateTask,
        toggleDone,
        updateTaskStatus,
        deleteTask,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
