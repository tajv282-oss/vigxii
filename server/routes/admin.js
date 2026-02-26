const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../middleware/auth');

// POST /api/admin/verify — verify token + admin status
router.post('/verify', verifyToken, requireAdmin, (req, res) => {
  res.json({
    success: true,
    user: {
      uid: req.user.uid,
      email: req.user.email,
      name: req.user.name || req.user.email,
    },
  });
});

module.exports = router;
