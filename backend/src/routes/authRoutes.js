const express = require('express');
const router = express.Router();
const {
  signupUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const {
  signupValidation,
  loginValidation,
} = require('../middleware/validationMiddleware');

router.post('/signup', signupValidation, signupUser);
router.post('/login', loginValidation, loginUser);
router.get('/me', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
