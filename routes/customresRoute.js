const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');
const {
    registerCustomer,
    loginCustomer,
    updateCustomer,
    deleteCustomer,
    logout
} = require('../controllers/customerAuth');

router.post('/signup',upload.single("photo"), registerCustomer);

router.post('/login', loginCustomer);

router.post('/update', updateCustomer);

router.post('/delete',deleteCustomer);

router.post('/logout',logout);


module.exports = router;