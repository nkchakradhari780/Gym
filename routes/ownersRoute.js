const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');

const {
    registerOwner,
    loginOwner,
    updateOwner,
    logout
} = require('../controllers/ownerAuth');

const {
    registerManager,
    updateManager,
    deleteManager,
    listManagers,
} = require('../controllers/managerAuth')

const {
    registerTrainer,
    updateTrainer,
    deleteTrainer,
    listTrainers,
    trainerAttendence,
    checkTrainerAttendence,
} = require('../controllers/trainerAuth')

const {
    deleteCustomer,
    registerCustomer,
    updateCustomer,
    listCustomers,
    checkCustomerAttendence,
    customerAttendence,
} = require('../controllers/customerAuth');

const {
    // equipmentStatus,
    addEquipment,
    updateEquipment,
    removeEquipment,
    listEquipments
} = require('../controllers/equipment')

// router.post('/signup', registerOwner);

// router.post('/update',updateOwner);

router.get('/manager',listManagers);

router.post('/manager/create', registerManager);

router.post('/manager/update',updateManager);

router.post('/manager/delete',deleteManager);



router.get('/trainer',listTrainers);

router.post('/trainer/create', registerTrainer);  

router.post('/trainer/update',updateTrainer);

router.post('/trainer/delete',deleteTrainer);

router.get('/trainer/attendence', checkTrainerAttendence);

router.post('/trainer/attendence/mark', trainerAttendence);



router.get('/customer',listCustomers);

router.post('/customer/create', registerCustomer);

router.post('/customer/update',updateCustomer);

router.post('/customer/delete',deleteCustomer);

router.get('/customer/attendance', checkCustomerAttendence);

router.post('/customer/attendance/mark', customerAttendence);



router.get('/equipment',listEquipments);

router.post('/equipment/add',addEquipment);

router.post('/equipment/update',updateEquipment);

router.post('/equipment/remove',removeEquipment);



router.post('/logout',logout);


module.exports = router;