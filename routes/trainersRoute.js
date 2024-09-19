const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const {
    loginTrainer,
    updateTrainer,
    logout,
    checkAttendence,
    customerAttendence
} = require('../controllers/trainerAuth');

const {
    updateEquipment,
    listEquipments,
    equipmentStatus,
} = require('../controllers/equipment');


router.post('/login', loginTrainer);

router.post('/logout',logout);

// Route to get trainer's attendance records
router.get('/trainer/attendance',checkAttendence);

router.get('/customer',customerList);

router.post('/customer/attendence',customerAttendence);

router.get('/equipment', listEquipments);

router.post('/equipment/update',updateEquipment);

router.get('/equipment/status',equipmentStatus);

module.exports = router;