const express = require('express');
const passport = require('passport');

const router = express.Router();

// Login using Google+ API
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback URL
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/surveys');
});

// Get current user info
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

// Log out and clear cookies
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
