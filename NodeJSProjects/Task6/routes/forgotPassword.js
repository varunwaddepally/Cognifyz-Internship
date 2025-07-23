const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

// GET Forgot Password form
router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
});

// POST Forgot Password submission
router.post('/forgot-password', async (req, res) => {
  const { username, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  db.query(
    'UPDATE users SET password = ? WHERE username = ?',
    [hashedPassword, username],
    (err, result) => {
      if (err) return res.send('Error updating password.');
      if (result.affectedRows === 0) return res.send('User not found.');
      res.send('Password updated successfully. <a href="/">Login</a>');
    }
  );
});

module.exports = router;
