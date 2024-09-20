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
} = require('../controllers/managerAuth')

const {
    registerTrainer,
    updateTrainer,
    deleteTrainer,
    listTrainers,
    trainerAttendence
} = require('../controllers/trainerAuth')

const {
    deleteCustomer,
    registerCustomer,
    updateCustomer,
    listCustomers,
    customerAttendence
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

router.post('/signup', registerOwner);

// router.post('/update',updateOwner);

router.post('/manager/create',upload.single("photo"), registerManager);

router.post('/manager/update',updateManager);

router.post('/manager/delete',deleteManager);


router.post('/trainer',listTrainers);

router.post('/trainer/create',upload.single("photo"), registerTrainer);  

router.post('/trainer/update',updateTrainer);

router.post('/trainer/delete',deleteTrainer);

router.post('/trainer/attendence',trainerAttendence);


router.post('/plan',listPlans);

router.post('/plan/create',createPlan);

router.post('/plan/delete',deletePlan);

router.post('/plan/update',updatePlan);


router.post('/customer',listCustomers);

router.post('/customer/create', registerCustomer);

router.post('/customer/update',updateCustomer);

router.post('/customer/deleteCustomer',deleteCustomer);

router.post('/customer/attendence',customerAttendence);


router.get('/equipment',listEquipments);

router.post('/equipment/create',addEquipment);

router.post('/equipment/update',updateEquipment);

router.post('/equipment/remove',removeEquipment);

router.get('/equipment/status',equipmentStatus);

 
router.post('/logout',logout);


module.exports = router;
