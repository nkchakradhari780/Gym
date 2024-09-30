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
    createPlan,
    updatePlan,
    deletePlan,
    listPlans
} = require('../controllers/plan');

const {
    equipmentStatus,
    addEquipment,
    updateEquipment,
    removeEquipment,
    listEquipments
} = require('../controllers/equipment')


// router.post('/update',updateManager);

router.post('/trainer',listTrainers);

router.post('/trainer/create',upload.single("photo"), registerTrainer);  

router.post('/trainer/update',updateTrainer);

router.post('/trainer/delete',deleteTrainer);

router.post('/trainer/attendence',trainerAttendence);

router.post('/trainer/attendence/mark', checkTrainerAttendence);


router.post('/plan',listPlans);

router.post('/plan/create',createPlan);

router.post('/plan/delete',deletePlan);

router.post('/plan/update',updatePlan);


router.post('/customer',listCustomers);

router.post('/customer/create',upload.single("photo"), registerCustomer);

router.post('/customer/update',updateCustomer);

router.post('/customer/deleteCustomer',deleteCustomer);

router.get('/customer/attendance', checkCustomerAttendence);

router.post('/customer/attendance/mark', customerAttendence);


router.get('/equipment',listEquipments);

router.post('/equipment/create',addEquipment);

router.post('/equipment/update',updateEquipment);

router.post('/equipment/remove',removeEquipment);


router.post('/logout',logout);

module.exports = router;