const express = require('express');
const Content = require('../models/Content');
const auth = require('../middleware/auth');

const router = express.Router();

// Check if user has active subscription
const checkSubscription = async (req, res, next) => {
  const User = require('../models/User');
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.subscription.isActive || new Date() > user.subscription.endDate) {
      return res.status(403).json({ message: 'Active subscription required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking subscription' });
  }
};

// Get books (protected)
router.get('/books', auth, checkSubscription, async (req, res) => {
  try {
    const books = await Content.find({ type: 'book', isActive: true }).sort({ createdAt: -1 });
    res.json({ books });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Get tutorials (protected)
router.get('/tutorials', auth, checkSubscription, async (req, res) => {
  try {
    const tutorials = await Content.find({ type: 'tutorial', isActive: true }).sort({ createdAt: -1 });
    res.json({ tutorials });
  } catch (error) {
    console.error('Get tutorials error:', error);
    res.status(500).json({ message: 'Error fetching tutorials' });
  }
});

// Add content (for admin)
router.post('/', async (req, res) => {
  try {
    const { type, title, description, link, category } = req.body;
    
    const content = new Content({
      type,
      title,
      description,
      link,
      category
    });

    await content.save();
    res.status(201).json({ message: 'Content added successfully', content });
  } catch (error) {
    console.error('Add content error:', error);
    res.status(500).json({ message: 'Error adding content' });
  }
});

module.exports = router;