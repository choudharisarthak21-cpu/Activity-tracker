const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskDone,
  updateTaskStatus,
  deleteTask,
  getTaskStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const {
  taskCreateValidation,
  taskUpdateValidation,
} = require('../middleware/validationMiddleware');

// All task routes require authentication
router.use(protect);

router.get('/stats/summary', getTaskStats);
router.get('/', getTasks);
router.post('/', taskCreateValidation, createTask);
router.get('/:id', getTaskById);
router.put('/:id', taskUpdateValidation, updateTask);
router.patch('/:id/toggle-done', toggleTaskDone);
router.patch('/:id/status', updateTaskStatus);
router.delete('/:id', deleteTask);

module.exports = router;
