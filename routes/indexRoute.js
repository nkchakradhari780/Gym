const express = require('express');
const router = express.Router();
const {
    registerOwner,
    loginOwner
} = require('../controllers/ownerAuth')
const {loginHandler} = require('../controllers/loginAuth');
const { loginManager } = require('../controllers/managerAuth');


router.post('/login', loginHandler);

router.post('/login/owner',loginOwner)

router.post('/login/manager',loginManager)

// console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    router.post('/owner/create', registerOwner);
}


router.post('/logout', (req,res)=>{
    try{
        res.clearCookie('token')
        res.status(200).json({message:"Logged Out Successfully"})
    }
    catch(err){
        res.status(500).json({success: false, message:"Internal server error"})
        console.error(err);
    }
})

module.exports = router;