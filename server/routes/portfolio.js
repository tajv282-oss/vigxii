const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { adminAuth } = require('../middleware/auth');
const { uploadProjectPhotos, deleteImage } = require('../config/cloudinary');

// ─── PUBLIC ─────────────────────────────────────────

// GET /api/portfolio — all projects (optional ?category filter)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category, isFilm: false } : { isFilm: false };
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/portfolio/featured
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).limit(12);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/portfolio/films — only film projects (have youtubeUrl)
router.get('/films', async (req, res) => {
  try {
    const films = await Project.find({ isFilm: true }).sort({ createdAt: -1 });
    res.json(films);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/portfolio/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── ADMIN PROTECTED ────────────────────────────────

// POST /api/portfolio — create project with cover image upload
// Send as multipart/form-data: coverImage (file), title, category, description, youtubeUrl, featured, isFilm
router.post('/', adminAuth, uploadProjectPhotos.single('coverImage'), async (req, res) => {
  try {
    const { title, category, description, youtubeUrl, featured, isFilm } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Cover image is required' });
    }

    const project = new Project({
      title,
      category,
      description,
      youtubeUrl: youtubeUrl || '',
      featured: featured === 'true' || featured === true,
      isFilm: isFilm === 'true' || isFilm === true,
      coverImage: {
        url: req.file.path,
        publicId: req.file.filename,
      },
      images: [],
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/portfolio/:id/images — upload gallery images to a project
router.post('/:id/images', adminAuth, uploadProjectPhotos.array('images', 25), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const newImages = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
    }));

    project.images.push(...newImages);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/portfolio/:id — update project details
router.put('/:id', adminAuth, uploadProjectPhotos.single('coverImage'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const { title, category, description, youtubeUrl, featured, isFilm } = req.body;

    if (title) project.title = title;
    if (category) project.category = category;
    if (description !== undefined) project.description = description;
    if (youtubeUrl !== undefined) project.youtubeUrl = youtubeUrl;
    if (featured !== undefined) project.featured = featured === 'true' || featured === true;
    if (isFilm !== undefined) project.isFilm = isFilm === 'true' || isFilm === true;

    // If new cover image uploaded, delete old one from Cloudinary
    if (req.file) {
      if (project.coverImage?.publicId) {
        await deleteImage(project.coverImage.publicId);
      }
      project.coverImage = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/portfolio/:id — delete project + all its Cloudinary images
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Delete all images from Cloudinary
    if (project.coverImage?.publicId) {
      await deleteImage(project.coverImage.publicId);
    }
    for (const img of project.images) {
      if (img.publicId) await deleteImage(img.publicId);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/portfolio/:id/images/:imageId — remove a single gallery image
router.delete('/:id/images/:publicId', adminAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const imageIndex = project.images.findIndex(img => img.publicId === req.params.publicId);
    if (imageIndex === -1) return res.status(404).json({ message: 'Image not found' });

    await deleteImage(req.params.publicId);
    project.images.splice(imageIndex, 1);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
