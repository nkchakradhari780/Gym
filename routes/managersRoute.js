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
    logout
    
} = require('../controllers/managerAuth');

router.post('/login',loginManager);

router.post('/update',updateManager);

router.post('/logout',logout);

router.post('/trainer/create',upload.single("photo"), registerTrainer);  

router.post('/trainer/update',updateTrainer);

router.post('/trainer/delete',deleteTrainer);

//create plan 
//update plan 
//delete plan

//create customer
//delete customer 
//update customer

module.exports = router;