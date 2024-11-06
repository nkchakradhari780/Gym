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



router.post('/create', createPlan);

router.put('/update/:id', updatePlan);

router.delete('/delete/:id', deletePlan);

router.get('/plan/:id', getPlanById); 

router.get('/', listPlans);



router.post('/diteplans/create', createDietPlan);

router.get('/diteplans/', getAllDietPlans);

router.get('/diteplans/:id', getDietPlanById);

router.put('/diteplans/:id', updateDietPlan);

router.delete('/diteplans/:id', deleteDietPlan);



router.post('/sendannouncement',sendAnnouncement);



module.exports = router;