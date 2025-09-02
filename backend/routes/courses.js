const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get user's course info
router.get('/my-course', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      subscription: user.subscription,
      paymentHistory: user.paymentHistory
    });
  } catch (error) {
    console.error('Get course info error:', error);
    res.status(500).json({ message: 'Error fetching course information' });
  }
});

module.exports = router;