'use strict';

// modules
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, res, cb) {
            cb(null, 'uploads/')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname)
        },
    }),
});

router.post('/', upload.single('image'), ctrl.image);

module.exports = router;