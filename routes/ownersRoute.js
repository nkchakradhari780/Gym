const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');

const {
    registerOwner,
    loginOwner,
    updateOwner,
    logout,
    ownerDetails
} = require('../controllers/ownerAuth');

const {
    registerManager,
    updateManager,
    deleteManager,
    listManagers,
    getManagerDetails,
} = require('../controllers/managerAuth')

const {
    registerTrainer,
    updateTrainer,
    deleteTrainer,
    listTrainers,
    trainerAttendence,
    checkTrainerAttendence,
    getTrainerDetails,
} = require('../controllers/trainerAuth')

const {
    deleteCustomer,
    registerCustomer,
    updateCustomer,
    listCustomers,
    checkCustomerAttendence,
    customerAttendence,
    customerDetails,
    listCustomersAttendence,
} = require('../controllers/customerAuth');

const {
    // equipmentStatus,
    addEquipment,
    updateEquipment,
    removeEquipment,
    listEquipments,
    equipmentDetails,
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
    sendAnnouncement
} = require('../controllers/AnnouncementsAuth')



// router.post('/update',updateOwner);

router.get('/',ownerDetails)

router.get('/manager',listManagers);

router.post('/manager/create', registerManager);

router.post('/manager/update',updateManager);

router.delete('/manager/:id',deleteManager);

router.get('/manager/:id',getManagerDetails)



router.get('/trainer',listTrainers);

router.post('/trainer/create', registerTrainer);  

router.put('/trainer/update',updateTrainer);

router.delete('/trainer/:id',deleteTrainer);

router.get('/trainer/attendence', checkTrainerAttendence);

router.post('/trainer/attendence/mark', trainerAttendence);

router.get('/trainer/:id',getTrainerDetails)



router.get('/customer',listCustomers);

router.post('/customer/create', registerCustomer);

router.put('/customer/update',updateCustomer);

router.delete('/customer/:id',deleteCustomer);

router.get('/customer/attendance', checkCustomerAttendence);

router.post('/customer/attendance/mark', customerAttendence);

router.get('/customer/:id', customerDetails)

router.get('/customer/attendance/list',listCustomersAttendence)



router.get('/equipment',listEquipments);

router.post('/equipment/add',addEquipment);

router.put('/equipment/:id',updateEquipment);

router.delete('/equipment/:id',removeEquipment);

router.get('/equipment/:id',equipmentDetails)



router.post('/plans/create', createPlan);

router.put('/plans/update/:id', updatePlan);

router.delete('/plans/:id', deletePlan);

router.get('/plan/:id', getPlanById); 

router.get('/plans', listPlans);



router.post('/diteplans/create', createDietPlan);

router.get('/diteplans/', getAllDietPlans);

router.get('/diteplans/:id', getDietPlanById);

router.put('/diteplans/:id', updateDietPlan);

router.delete('/diteplans/:id', deleteDietPlan);



router.post('/sendannouncement',sendAnnouncement);






module.exports = router;