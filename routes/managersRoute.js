const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');
const {
    registerManager,
    loginManager,
    updateManager,
    deleteManager,
    logout
} = require('../controllers/ownerAuth');

router.post('/signup',upload.single("photo"), registerManager);

router.post('/login', loginManager);

router.post('/update',isLoggedin, updateManager);

router.post('/delete',isLoggedin,deleteManager);

router.post('/logout',logout);


module.exports = router;