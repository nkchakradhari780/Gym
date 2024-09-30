const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');
const {
    loginCustomer,
    checkCustomerAttendence,
    customerDetails,
    logout
} = require('../controllers/customerAuth');

router.get('/',customerDetails);

router.get('/checkAttendence', checkCustomerAttendence);

router.post('/logout',logout);


module.exports = router;