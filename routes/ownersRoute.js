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
    listCustomers,
} = require('../controllers/customerAuth')

const {
    registerTrainer,
    updateTrainer,
    deleteTrainer,
    listTrainers,
} = require('../controllers/trainerAuth')

const {
    listEquipments
} = require('../controllers/equipment');

const {
    createPlan,
    deletePlan,
    updatePlan,
    listPlans
} = require('../controllers/plan');

// router.post('/signup',upload.single("photo"), registerOwner);

router.post('/login', loginOwner);

// router.post('/update',isLoggedin, updateOwner);

router.post('/manager/create',upload.single("photo"), registerManager);

router.post('/manager/update',updateManager);

router.post('/manager/delete',deleteManager);

router.post('/trainer/create',registerTrainer);

router.post('/trainer/update',updateTrainer);

router.post('/trainer/delete',deleteTrainer);

router.get('/trainer/list',listTrainers);

router.post('/plan/create',createPlan);

router.post('/plan/delete',deletePlan);

router.post('/plan/update',updatePlan);

router.get('/plan/list',listPlans);


router.post('/logout',logout);



module.exports = router;


