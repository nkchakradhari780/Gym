const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');

const {
    loginManager,
    logout
    
} = require('../controllers/managerAuth');

const {
    registerTrainer,
    updateTrainer,
    deleteTrainer,
    listTrainers,
    trainerAttendence,
    checkTrainerAttendence
} = require('../controllers/trainerAuth')

const {
    deleteCustomer,
    registerCustomer,
    updateCustomer,
    listCustomers,
    customerAttendence,
    checkCustomerAttendence,
} = require('../controllers/customerAuth');


const {
    equipmentStatus,
    addEquipment,
    updateEquipment,
    removeEquipment,
    listEquipments
} = require('../controllers/equipment')


// router.post('/update',updateManager);

router.post('/trainer',listTrainers);

router.post('/trainer/create', registerTrainer);  

router.post('/trainer/update',updateTrainer);

router.post('/trainer/delete',deleteTrainer);

router.get('/trainer/attendence', checkTrainerAttendence);

router.post('/trainer/attendence/mark', trainerAttendence);



router.post('/customer',listCustomers);

router.post('/customer/create', registerCustomer);

router.post('/customer/update',updateCustomer);

router.post('/customer/deleteCustomer',deleteCustomer);

router.get('/customer/attendance', checkCustomerAttendence);

router.post('/customer/attendance/mark', customerAttendence);


router.get('/equipment',listEquipments);

router.post('/equipment/create',addEquipment);

router.post('/equipment/update',updateEquipment);

router.post('/equipment/remove',removeEquipment);



module.exports = router;