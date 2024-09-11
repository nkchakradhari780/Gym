const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin')
const {
    registerUser,
    loginUser,
    logout
} = require('../controllers/userAuth');

//login
//register
//plans by
//freetrial
//services
//coaches
//about us 
//home 

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.post('/logout',logout);

module.exports = router;
