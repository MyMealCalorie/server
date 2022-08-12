'use strict';

// modules
const express = require('express');
const router = express.Router();

// controller
const ctrl = require('./users.crtl');

// router
router.post('/signup', ctrl.user.signUp);
router.post('/signin', ctrl.user.signIn);

module.exports = router;