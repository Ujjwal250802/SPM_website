const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendEmail } = require('../utils/email');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const planPrices = {
  '3months': 2000,
  '6months': 3000,
  '1year': 5000
};

// Create order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { plan } = req.body;
    
    if (!planPrices[plan]) {
      return res.status(400).json({ message: 'Invalid plan selected' });
    }

    const amount = planPrices[plan] * 100; // Convert to paisa
    
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Error creating payment order' });
  }
});

// Verify payment
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, userDetails } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Update user subscription
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const planDurations = {
      '3months': 3,
      '6months': 6,
      '1year': 12
    };

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + planDurations[plan]);

    user.subscription = {
      type: plan,
      startDate,
      endDate,
      isActive: true
    };

    // Update user details if provided
    if (userDetails) {
      if (userDetails.phone) user.phone = userDetails.phone;
      if (userDetails.address) user.address = userDetails.address;
    }

    // Add payment to history
    user.paymentHistory.push({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: planPrices[plan],
      plan,
      status: 'completed'
    });

    await user.save();

    // Send email notification to owner
    const emailSubject = `New Course Enrollment - ${plan.toUpperCase()}`;
    const emailBody = `
      <h2>New Course Enrollment</h2>
      <p><strong>Student Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone || 'Not provided'}</p>
      <p><strong>Address:</strong> ${user.address || 'Not provided'}</p>
      <p><strong>Plan:</strong> ${plan.toUpperCase()}</p>
      <p><strong>Amount Paid:</strong> ₹${planPrices[plan]}</p>
      <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
      <p><strong>Start Date:</strong> ${startDate.toLocaleDateString()}</p>
      <p><strong>End Date:</strong> ${endDate.toLocaleDateString()}</p>
    `;

    await sendEmail(process.env.EMAIL_USER, emailSubject, emailBody);

    res.json({
      message: 'Payment verified successfully',
      subscription: user.subscription
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
});

module.exports = router;