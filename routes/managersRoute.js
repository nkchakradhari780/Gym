const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');
const {
    registerTrainer,
    loginManager,
    updateManager,
    updateTrainer,
    deleteTrainer,
    listTrainers,
    logout
    
} = require('../controllers/managerAuth');

const {
    registerCustomer,
    updateCustomer,
    deleteCustomer,
    listCustomers
} = require('../controllers/customerAuth');

const {
    createPlan,
    updatePlan,
    deletePlan,
    listPlans
} = require('../controllers/plan');

router.post('/login',loginManager);

// router.post('/update',updateManager);

router.post('/trainer',listTrainers);

router.post('/trainer/create',upload.single("photo"), registerTrainer);  

router.post('/trainer/update',updateTrainer);

router.post('/trainer/delete',deleteTrainer);


router.post('/plan',listPlans);

router.post('/plan/create',createPlan);

router.post('/plan/delete',deletePlan);

router.post('/plan/update',updatePlan);


router.post('/customer',listCustomers);

router.post('/customer/create',registerCustomer);

router.post('/customer/update',updateCustomer);

router.post('/customer/deleteCustomer',deleteCustomer);


router.post('/logout',logout);

module.exports = router;