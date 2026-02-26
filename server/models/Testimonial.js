const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientImage: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' },
  },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  quote: { type: String, required: true },
  event: { type: String },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
