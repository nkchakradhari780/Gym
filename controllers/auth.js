const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userModel = require('../models/user_model');
const customerModel = require('../models/costumer_model')
const {generateToken } = require('../utils/generatetoken');

module.exports.registerUser = async (req,res)=>{
    try{

        let {email,fullname,password} = req.body;
        
        let user = await userModel.findOne({email: email});
        if(user) return res.status(401).send("User alredy exists");
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                if(err) return res.send(err.message);
                else{
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });
                    let token = generateToken(user);
                    res.cookie("token",token);
                    res.send("user created successfully");
                }
            })
        })
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports.loginUser = async (req,res)=>{

    try{
        let {email,password} = req.body;
    
        let user = await userModel.findOne({email});
        if(!user) return res.send("Email or password is incorrect")
            
        bcrypt.compare(password,user.password, (err,result)=>{
            if(result){
                let token = generateToken(user);
                res.cookie("token",token);
                res.send("user loged in")
            }
            else{
                req.send("Email or password is incorrect");
                return res.redirect("/");       //login page 
            }
                
                // console.log(user);
        })
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports.registerCustomer = async (req,res) =>{
    try{
        
        let {email,fullname,password,contact,photo,address,weight,age} = req.body;

        let customer = await customerModel.findOne({email: email});
        if(customer) return res.status(401).send("Customer Exists You need to Login");

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                if(err) return res.send(err.message);
                else{
                    let customer = await customerModel.create({
                        email,
                        fullname,
                        contact,
                        address,
                        weight,
                        age,
                        password: hash,
                        photo: req.file.buffer
                    });
                    let token = generateToken(customer);
                    res.cookie("token",token);
                    res.send("customer created successfully")
                }
            })
        })
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports.loginCustomer = async (req,res) =>{
    try{
        let {email,password} = req.body;

        let customer = await customerModel.findOne({email});
        if(!customer) return res.send("Email or password is incorrect");
        bcrypt.compare(password,customer.password, (err,result)=>{
            if(result){
                let token = generateToken(customer);
                res.cookie("token",token);
                res.send("customer loged in")
            }
            else{
                req.send("Email or password is incorrect");
                return res.redirect("/");
            }
        })
    }
    catch(err){
        console.log(err.message);
    }
}



module.exports.logout = (req,res)=>{
    res.cookie("token")
    res.redirect("/");      //home page 
}



// module.exports.verifyOtp
// module.exports.resendOtp
// module.exports.forgetpassword
// module.exports.resetpassword
// module.exports.checkAuth
