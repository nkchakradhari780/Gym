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

const {
    getAnnouncement
} = require('../controllers/AnnouncementsAuth');

const { 
    listPlans,
    buyPlans,
 } = require('../controllers/plan');
 

router.get('/profile',customerDetails);

router.get('/checkAttendence', checkCustomerAttendence);

router.get('/announcement',getAnnouncement);

router.get('/plans/list',listPlans);

router.post('/byPlan',buyPlans)


module.exports = router;
