const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const isLoggedin = require('../middlewares/isLoggedin');
const {
    registerManager,
    registerTrainer,
    loginManager,
    updateManager,
    logout
    
} = require('../controllers/managerAuth');

router.post('/signup',upload.single("photo"), registerManager);

router.post('/login',loginManager);

router.post('/update',updateManager);

router.post('/logout',logout);

router.post('/trainer/create',upload.single("photo"), registerTrainer);  

//create trainer
//update trainer
//delete trainer
//create customer
//delete customer 
//update customer

module.exports = router;