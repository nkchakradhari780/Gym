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

   //remove this section 

router.post('/login', loginTrainer);

router.post('/update',updateTrainer);

router.post('/logout',logout);

module.exports = router;