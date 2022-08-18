'use strict';

// Modules
const express = require('express');
const router = express.Router();

// Controller
const ctrl = require('./users.crtl');

// Router
router.post('/signup', ctrl.user.signUp);
router.post('/signin', ctrl.user.signIn);

module.exports = router;