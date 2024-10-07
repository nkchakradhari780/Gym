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

router.get('/:id',customerDetails);

router.get('/checkAttendence', checkCustomerAttendence);


module.exports = router;