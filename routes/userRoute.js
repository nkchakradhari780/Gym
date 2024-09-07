const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logout
} = require('../controllers/auth');

//login
//register
//plans by
//freetrial
//services
//coaches
//about us 
//home 

router.post('/register',registerUser);

router.post('/login', loginUser);

router.post('/logout',logout);

module.exports = router;