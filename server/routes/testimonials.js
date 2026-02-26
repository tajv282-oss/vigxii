const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { adminAuth } = require('../middleware/auth');
const { uploadAvatar, deleteImage } = require('../config/cloudinary');

// ─── PUBLIC ─────────────────────────────────────────

// GET /api/testimonials — only approved testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── ADMIN PROTECTED ────────────────────────────────

// GET /api/testimonials/all — all testimonials including unapproved (admin)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/testimonials — create with optional avatar upload
router.post('/', adminAuth, uploadAvatar.single('clientImage'), async (req, res) => {
  try {
    const { clientName, quote, rating, event, approved } = req.body;

    const testimonial = new Testimonial({
      clientName,
      quote,
      rating: rating || 5,
      event,
      approved: approved === 'true' || approved === true,
      clientImage: req.file
        ? { url: req.file.path, publicId: req.file.filename }
        : { url: '', publicId: '' },
    });

    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/testimonials/:id — update testimonial
router.put('/:id', adminAuth, uploadAvatar.single('clientImage'), async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    const { clientName, quote, rating, event, approved } = req.body;

    if (clientName) testimonial.clientName = clientName;
    if (quote) testimonial.quote = quote;
    if (rating) testimonial.rating = rating;
    if (event !== undefined) testimonial.event = event;
    if (approved !== undefined) testimonial.approved = approved === 'true' || approved === true;

    // If new avatar uploaded, delete old one
    if (req.file) {
      if (testimonial.clientImage?.publicId) {
        await deleteImage(testimonial.clientImage.publicId);
      }
      testimonial.clientImage = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    await testimonial.save();
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/testimonials/:id/approve — toggle approval
router.patch('/:id/approve', adminAuth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    testimonial.approved = !testimonial.approved;
    await testimonial.save();
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/testimonials/:id
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    if (testimonial.clientImage?.publicId) {
      await deleteImage(testimonial.clientImage.publicId);
    }

    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
