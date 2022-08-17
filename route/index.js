'use strict';

// Modules
const express = require('express');
const router = express.Router();

// Routing
const users = require('./users/users');
const images = require('./images/images');
const data = require('./data/data');

// Middleware
const auth = require('../utils/auth');

router.use('/users', users);
router.use('/images', images);
// router.use('/data', auth, data); 

module.exports = router;