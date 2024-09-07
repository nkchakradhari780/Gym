const customerModel = require('../models/costumer_model');
const bcrypt = require('bcrypt');
const {generateToken } = require('../utils/generatetoken');

module.exports.registerUser = async (req,res)=>{
    try{
        let {email,fullname,password} = req.body;
        
        let customer = await customerModel.findOne({email: email});
        if(customer) return res.status(401).send("User alredy exists");
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                if(err) return res.send(err.message);
                else{
                    let customer = await customerModel.create({
                        email,
                        password: hash,
                        fullname,
                    });
                    let token = generateToken(customer);
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
    let {email,password} = req.body;

    let customer = await customerModel.findOne({email});
    console.log(customer);
    if(!customer) return res.send("Email or password is incorrect")

    bcrypt.compare(password,customer.password, (err,result)=>{
        if(result){
            let token = generateToken(customer);
            res.cookie("token",token);
        }
        else{
            req.send("Email or password is incorrect");
            return res.redirect("/");
        }

    })
}

module.exports.logout = (req,res)=>{
    res.cookie("token")
}