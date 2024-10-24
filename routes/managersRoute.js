const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');

const {
    loginManager,
    logout,
    managerDetails
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

const {
    createPlan,
    updatePlan,
    deletePlan,
    listPlans,
    getPlanById
} = require('../controllers/plan');

const { 
    createDietPlan, 
    getAllDietPlans, 
    getDietPlanById, 
    updateDietPlan, 
    deleteDietPlan 
} = require('../controllers/plan');

const { 
    getAnnouncement 
} = require('../controllers/AnnouncementsAuth');

// router.post('/update',updateManager);

router.get('/',managerDetails)

router.get('/trainer',listTrainers);

router.post('/trainer/create', registerTrainer);  

router.post('/trainer/update',updateTrainer);

router.post('/trainer/delete',deleteTrainer);

router.get('/trainer/attendence', checkTrainerAttendence);

router.post('/trainer/attendence/mark', trainerAttendence);



router.get('/customer',listCustomers);

router.post('/customer/create', registerCustomer);

router.post('/customer/update',updateCustomer);

router.post('/customer/deleteCustomer',deleteCustomer);

router.get('/customer/attendance', checkCustomerAttendence);

router.post('/customer/attendance/mark', customerAttendence);


router.get('/equipment',listEquipments);

router.post('/equipment/create',addEquipment);

router.post('/equipment/update',updateEquipment);

router.post('/equipment/remove',removeEquipment);


router.post('/plan/create', createPlan);

router.put('/plan/update/:id', updatePlan);

router.delete('/plan/delete/:id', deletePlan);

router.get('/plan/:id', getPlanById); 

router.get('/plan', listPlans);



router.post('/diteplans/create', createDietPlan);

router.get('/diteplans/', getAllDietPlans);

router.get('/diteplans/:id', getDietPlanById);

router.put('/diteplans/:id', updateDietPlan);

router.delete('/diteplans/:id', deleteDietPlan);



router.get('/announcement',getAnnouncement);

module.exports = router;