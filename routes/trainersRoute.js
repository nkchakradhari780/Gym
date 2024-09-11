const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const {
    registerTrainer,
    loginTrainer,
    updateTrainer,
    deleteTrainer,
    logout
} = require('../controllers/trainerAuth');

router.post('/signup',upload.single("photo"), registerTrainer);

router.post('/login', loginTrainer);

router.post('/update',updateTrainer);

router.post('/delete',deleteTrainer);

router.post('/logout',logout);

module.exports = router;