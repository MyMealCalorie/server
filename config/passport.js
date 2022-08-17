'use strict';

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const passportConfig = { usernameField: 'email', passwordField: 'password' };

