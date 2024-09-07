const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("hey its working");
})

// /aboutus 
// /ourtrainers
// /plans 
// /  (home page ) 
// /services
// /contactus (login first)
// /free trial (login first)
// /login
// /signup

module.exports = router;