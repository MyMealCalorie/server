'use strict';

// Modules
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, 'uploads/imgs');
        },
        // 22.08.12 by Steve / To-do: user_id를 활용한 식별 가능한 파일명 작업
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            if(ext !== '.jpeg' || '.jpg' || '.png') {
                return cb(null, false);
            }
            return cb(null, true);
        },
        limits: {
            fileSize: 20 * 1024 *1024
        },
    }),
});

// Controller
const ctrl = require('./images.crtl');

// Router
router.post('/', upload.single('image'), ctrl.image);

module.exports = router;