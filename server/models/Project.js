const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  width: { type: Number },
  height: { type: Number },
}, { _id: false });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Weddings', 'Pre-Wedding', 'Fashion', 'Commercial', 'Events'],
  },
  coverImage: { type: imageSchema, required: true },
  description: { type: String },
  images: [imageSchema],
  // YouTube video link for films
  youtubeUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  isFilm: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);
