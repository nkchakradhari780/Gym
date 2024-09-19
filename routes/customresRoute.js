const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');
const {
    loginCustomer,
    checkAttendence,
    customerDetails,
    logout
} = require('../controllers/customerAuth');


router.post('/login', loginCustomer);

router.get('/checkAttendence', checkAttendence);

router.post('/logout',logout);


module.exports = router;