const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');
const {
    registerOwner,
    loginOwner,
    updateOwner,
    deleteOwner,
    logout
} = require('../controllers/customerAuth');

router.post('/signup',upload.single("photo"), registerOwner);

router.post('/login', loginOwner);

router.post('/update',isLoggedin, updateOwner);

router.post('/delete',isLoggedin,deleteOwner);

router.post('/logout',logout);

module.exports = router;


