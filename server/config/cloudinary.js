const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for project photos
const projectStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'vigxii/projects',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1920, height: 1280, crop: 'limit', quality: 'auto' }],
  },
});

// Storage for testimonial avatars
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'vigxii/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 300, height: 300, crop: 'fill', gravity: 'face', quality: 'auto' }],
  },
});

const uploadProjectPhotos = multer({ storage: projectStorage });
const uploadAvatar = multer({ storage: avatarStorage });

// Delete image from Cloudinary by public_id
const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error('Cloudinary delete error:', err);
  }
};

// Extract public_id from Cloudinary URL
const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split('/');
  const folder = parts.slice(-2, -1)[0];
  const filename = parts.slice(-1)[0].split('.')[0];
  return `${folder}/${filename}`;
};

module.exports = {
  cloudinary,
  uploadProjectPhotos,
  uploadAvatar,
  deleteImage,
  getPublicIdFromUrl,
};
