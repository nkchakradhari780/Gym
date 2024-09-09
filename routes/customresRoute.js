const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const {
    registerCustomer,
    loginCustomer,
    logout
} = require('../controllers/auth');

router.post('/signup',upload.single("photo"), registerCustomer);

router.post('/login', loginCustomer);

router.post('/logout',logout);

module.exports = router;