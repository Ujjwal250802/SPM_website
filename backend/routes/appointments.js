const express = require('express');
const { body, validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');
const { sendEmail } = require('../utils/email');

const router = express.Router();

// Create appointment
router.post('/', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('phone').trim().isLength({ min: 10 }).withMessage('Phone number must be at least 10 digits'),
  body('serviceType').isIn(['bridal', 'party', 'normal']).withMessage('Invalid service type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, serviceType, details, preferredDate } = req.body;

    const appointment = new Appointment({
      name,
      phone,
      email,
      serviceType,
      details,
      preferredDate: preferredDate ? new Date(preferredDate) : null
    });

    await appointment.save();

    // Send email notification to owner
    const emailSubject = `New Appointment Request - ${serviceType.toUpperCase()}`;
    const emailBody = `
      <h2>New Appointment Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Service Type:</strong> ${serviceType.toUpperCase()}</p>
      <p><strong>Details:</strong> ${details || 'No additional details'}</p>
      <p><strong>Preferred Date:</strong> ${preferredDate ? new Date(preferredDate).toLocaleDateString() : 'Not specified'}</p>
      <p><strong>Requested On:</strong> ${new Date().toLocaleString()}</p>
    `;

    await sendEmail(process.env.EMAIL_USER, emailSubject, emailBody);

    res.status(201).json({
      message: 'Appointment request submitted successfully',
      appointment: {
        id: appointment._id,
        name: appointment.name,
        serviceType: appointment.serviceType,
        status: appointment.status
      }
    });
  } catch (error) {
    console.error('Appointment creation error:', error);
    res.status(500).json({ message: 'Server error while creating appointment' });
  }
});

// Get all appointments (for admin)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({ appointments });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error while fetching appointments' });
  }
});

module.exports = router;