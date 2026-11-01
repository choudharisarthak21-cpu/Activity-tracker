const Task = require('../models/Task');

// @desc    Get all tasks for logged in user with filters, search, and sorting
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const {
      status,
      priority,
      category,
      search,
      startDate,
      endDate,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const query = { userId: req.user._id };

    if (status && ['todo', 'done', 'planned'].includes(status)) {
      query.status = status;
    }

    if (priority && ['Low', 'Medium', 'High'].includes(priority)) {
      query.priority = priority;
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [{ title: searchRegex }, { description: searchRegex }];
    }

    if (startDate || endDate) {
      query.dueDate = {};
      if (startDate) query.dueDate.$gte = new Date(startDate);
      if (endDate) query.dueDate.$lte = new Date(endDate);
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    let sortOptions = {};

    if (sortBy === 'priority') {
      // Map priority sorting if needed or sort by field
      sortOptions = { priority: sortOrder, createdAt: -1 };
    } else if (sortBy === 'dueDate') {
      sortOptions = { dueDate: sortOrder, createdAt: -1 };
    } else if (sortBy === 'title') {
      sortOptions = { title: sortOrder };
    } else {
      sortOptions = { [sortBy]: sortOrder };
    }

    const tasks = await Task.find(query).sort(sortOptions);

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or unauthorized',
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, category, status, dueDate } = req.body;

    const taskStatus = status || 'todo';
    const completedAt = taskStatus === 'done' ? new Date() : null;

    const task = await Task.create({
      userId: req.user._id,
      title,
      description: description || '',
      priority: priority || 'Medium',
      category: category || 'Work',
      status: taskStatus,
      dueDate: dueDate ? new Date(dueDate) : null,
      completedAt,
    });

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task details
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or unauthorized',
      });
    }

    const updates = { ...req.body };

    // Handle status changes and completedAt timestamp
    if (updates.status !== undefined) {
      if (updates.status === 'done' && task.status !== 'done') {
        updates.completedAt = new Date();
      } else if (updates.status !== 'done' && task.status === 'done') {
        updates.completedAt = null;
      }
    }

    if (updates.dueDate !== undefined) {
      updates.dueDate = updates.dueDate ? new Date(updates.dueDate) : null;
    }

    task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle task done status (one-click)
// @route   PATCH /api/tasks/:id/toggle-done
// @access  Private
const toggleTaskDone = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or unauthorized',
      });
    }

    if (task.status === 'done') {
      task.status = 'todo';
      task.completedAt = null;
    } else {
      task.status = 'done';
      task.completedAt = new Date();
    }

    await task.save();

    return res.status(200).json({
      success: true,
      message: `Task marked as ${task.status === 'done' ? 'completed' : 'todo'}`,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task status (Drag & Drop column change)
// @route   PATCH /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['todo', 'done', 'planned'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be todo, done, or planned',
      });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or unauthorized',
      });
    }

    task.status = status;
    if (status === 'done') {
      task.completedAt = new Date();
    } else {
      task.completedAt = null;
    }

    await task.save();

    return res.status(200).json({
      success: true,
      message: `Task moved to ${status}`,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or unauthorized',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get task statistics for dashboard & analytics overview
// @route   GET /api/tasks/stats/summary
// @access  Private
const getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [allTasks, stats] = await Promise.all([
      Task.find({ userId }).select('status priority category dueDate completedAt createdAt'),
      Task.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const counts = {
      total: allTasks.length,
      todo: 0,
      done: 0,
      planned: 0,
    };

    stats.forEach((item) => {
      if (counts[item._id] !== undefined) {
        counts[item._id] = item.count;
      }
    });

    const completionRate =
      counts.total > 0 ? Math.round((counts.done / counts.total) * 100) : 0;

    // Category breakdown
    const categoryCounts = {};
    const priorityCounts = { Low: 0, Medium: 0, High: 0 };

    allTasks.forEach((t) => {
      categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
      if (priorityCounts[t.priority] !== undefined) {
        priorityCounts[t.priority]++;
      }
    });

    // Weekly completion data (past 7 days)
    const last7Days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

      // Count tasks completed on this date
      const completedOnDay = allTasks.filter((t) => {
        if (!t.completedAt) return false;
        const compDateStr = new Date(t.completedAt).toISOString().split('T')[0];
        return compDateStr === dateStr;
      }).length;

      // Count tasks created on this date
      const createdOnDay = allTasks.filter((t) => {
        const createDateStr = new Date(t.createdAt).toISOString().split('T')[0];
        return createDateStr === dateStr;
      }).length;

      last7Days.push({
        date: dateStr,
        day: dayName,
        completed: completedOnDay,
        created: createdOnDay,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        total: counts.total,
        todo: counts.todo,
        done: counts.done,
        planned: counts.planned,
        completionRate,
        categoryCounts,
        priorityCounts,
        weeklyTrend: last7Days,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskDone,
  updateTaskStatus,
  deleteTask,
  getTaskStats,
};
