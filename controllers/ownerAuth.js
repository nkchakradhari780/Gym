const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ownerModel = require('../models/owner_model');
const gymModel = require('../models/gym_model');
const { generateToken } = require("../utils/generatetoken");

module.exports.registerOwner = async (req,res)=>{
    try{
      let {fullname, email, password, contact, photo, address, aadharNo, age } = req.body;
  
      let owner = await ownerModel.findOne({email});
      if(owner)
        return res.status(401).send("Owner Alredy Exists");
  
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password, salt, async(err, hash)=>{
          if(err) return res.send(err.message)
          else{
            let owner = await ownerModel.create({
              fullname,
              email,
              password: hash,
              contact,
              photo,
              address,
              aadharNo,
              age,
            })
            console.json(owner);
            res.send("Owner Created");
          }
        })
      })
    }
    catch(err){
      console.log(err.message);
      res.send("Something Went Wrong ")
    }
  }
  

  module.exports.loginOwner = async (req,res)=>{
    try{
      let {email, password } = req.body;
  
      let owner = await ownerModel.findOne({email});
      if(!owner) return res.send("Email or password is incorrect");
      bcrypt.compare(password, owner.password, (err,result)=>{
        if(result){
          let token = jwt.sign({ownerId: owner._id},process.env.JWT_KEY);
          res.cookie("token", token,{
            httpOnly: true,
            secrure: false,
            maxAge: 3600000
          });
          res.status(200).json({success: true, message: "Owner LoggedIN Successfully",owner,token})
        }
        else{
          req.send("Email or password is incorrect");
          return res.redirect('/')
        }
      })
    }
    catch(err){
      console.log(err.message);
    }
  }

