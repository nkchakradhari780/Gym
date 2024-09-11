const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const {
    registerTrainer,
    loginTrainer,
    logout
} = require('../controllers/auth');

router.post('/signup',upload.single("photo"), registerTrainer);

router.post('/login', loginTrainer);

router.post('/logout',logout);

module.exports = router;