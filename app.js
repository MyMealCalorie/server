'use strict';

// Modules
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const dotenv = require('dotenv').config();

// Routing
const router = require('./route/index');

// App setting
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use('/uploads/img', express.static('uploads'));
app.use(router);

module.exports = app;