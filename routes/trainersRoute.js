const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const {
    checkAttendence,
    logout,
} = require('../controllers/trainerAuth');

const {
    customerAttendence,
    listCustomers
} = require('../controllers/customerAuth')

const {
    updateEquipment,
    listEquipments,
    equipmentStatus,
} = require('../controllers/equipment');


// Route to get trainer's attendance records
router.get('/trainer/attendance',checkAttendence);


router.get('/customer',listCustomers);

router.post('/customer/attendence',customerAttendence);


router.get('/equipment', listEquipments);

router.post('/equipment/update',updateEquipment);

// router.get('/equipment/status',equipmentStatus);

module.exports = router;