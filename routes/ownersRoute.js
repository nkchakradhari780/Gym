const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');
const {
    registerOwner,
    registerManager,
    loginOwner,
    updateOwner,
    updateManager,
    deleteManager,
    logout
} = require('../controllers/ownerAuth');

const {
    registerTrainer,
    updateTrainer,
    deleteTrainer,
    createPlan,
    deletePlan
} = require('../controllers/managerAuth')

// router.post('/signup',upload.single("photo"), registerOwner);

router.post('/login', loginOwner);

// router.post('/update',isLoggedin, updateOwner);

router.post('/manager/create',upload.single("photo"), registerManager);

router.post('/manager/update',updateManager);

router.post('/manager/delete',deleteManager);

router.post('/trainer/create',registerTrainer);

router.post('/trainer/update',updateTrainer);

router.post('/trainer/delete',deleteTrainer);

router.post('/plan/create',createPlan);

router.post('/plan/delete',deletePlan);

router.post('/logout',logout);



module.exports = router;


