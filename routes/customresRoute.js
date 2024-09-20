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

router.get('/',customerDetails);

router.get('/checkAttendence', checkAttendence);

router.post('/logout',logout);


module.exports = router;