const express = require('express');
const router = express.Router();
// const isAuthenticated = require('../middlewares/')

router.get("/",(req,res)=>{
    res.send("hey its working");
})

// Home page
router.get("/", (req, res) => {
    res.send("Welcome to the home page!");
});

// About Us page
router.get("/aboutus", (req, res) => {
    res.send("This is the About Us page");
});

// Our Trainers page
router.get("/ourtrainers", (req, res) => {
    res.send("Meet our trainers!");
});

// Plans page
router.get("/plans", (req, res) => {
    res.send("Here are our plans!");
});

// Services page
router.get("/services", (req, res) => {
    res.send("These are the services we offer");
});

// // Contact Us page (requires login)
// router.get("/contactus", isAuthenticated, (req, res) => {
//     res.send("Contact us after logging in");
// });

// // Free Trial page (requires login)
// router.get("/freetrial", isAuthenticated, (req, res) => {
//     res.send("Enjoy a free trial after logging in");
// });

router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.get('/login',(req,res)=>{
    res.render('login');
})


module.exports = router;