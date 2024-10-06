const express = require('express');
const router = express.Router();
const {loginOwner} = require('../controllers/ownerAuth')
const {loginManager} = require('../controllers/managerAuth')
const {loginCustomer} = require('../controllers/customerAuth')
const {loginTrainer} = require('../controllers/trainerAuth');
const {listPlans} = require('../controllers/plan');

// const isAuthenticated = require('../middlewares/')

// Home page
// router.get("/", (req, res) => {
//     res.send("Welcome to the home page!");
// });

// router.get('/signup',(req,res)=>{
//     res.render('signup');
// })
// router.get('/customersignup',(req,res)=>{
//     res.render('signupcustomer');
// })

// router.get('/login',(req,res)=>{
//     res.render('login');
// })

// router.get('/customerupdate',(req,res)=>{
//     res.render('update');
// })

// router.get('/customerdelete',(req,res)=>{
//     res.render('delete');
// })

router.post('/login/owner', loginOwner);

router.post('/login/manager',loginManager);

router.post('/login/customer', loginCustomer);

router.post('/login/trainer', loginTrainer);

router.post('/logout', (req,res)=>{
    try{
        res.clearCookie('token')
        res.send(200).json({message:"Logged Out Successfully"})
    }
    catch(err){
        res.status(500).json({success: false, message:"Internal server error"})
        console.error(err);
    }
})

module.exports = router;