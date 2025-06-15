// routes/auth.router.js
const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/auth.controller');

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/signin
router.post('/signin', signin);

module.exports = router;