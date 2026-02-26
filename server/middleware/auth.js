const admin = require('../config/firebase');

// Verify Firebase ID token from Authorization header
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Check if the user has admin role (custom claim) or is in allowed admin emails
const requireAdmin = async (req, res, next) => {
  try {
    // Check custom claim first
    if (req.user.admin === true) {
      return next();
    }

    // Fallback: check against allowed admin emails in env
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
    if (adminEmails.includes(req.user.email?.toLowerCase())) {
      return next();
    }

    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
};

// Combined middleware: verify token + check admin
const adminAuth = [verifyToken, requireAdmin];

module.exports = { verifyToken, requireAdmin, adminAuth };
