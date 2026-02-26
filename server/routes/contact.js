const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { adminAuth } = require('../middleware/auth');

// POST /api/contact — public (anyone can submit)
router.post('/', async (req, res) => {
  try {
    const { name, email, eventType, eventDate, message } = req.body;
    const newContact = new Contact({ name, email, eventType, eventDate, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/contact — admin only
router.get('/', adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/contact/:id — admin only
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
