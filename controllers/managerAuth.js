const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const managerModel = require('../models/manager_model')
const { generateToken } = require("../utils/generatetoken");



module.exports.registerManager = async (req,res)=>{
    try{
      let { fullName, email, password, contact, address, aadharNo, age, salary, photo, managerId } = req.body;
  
      let manager = await managerModel.findOne({email: email});
      if (manager)
        return res.status(401).send("Manager Exists You Need to login ");
  
      bcrypt.genSalt(10,(err, salt) =>{
        bcrypt.hash(password,salt, async (err,hash)=>{
          if (err) return res.send(err.message);
          else{
            let manager = await managerModel.create({
              email,
              fullName,
              contact,
              address,
              aadharNo,
              age,
              salary,
              managerId,
              photo,
              password: hash
            })
          }
        })
      })
  
    }
    catch(err){
      console.log(err.message);
    }
  }
  module.exports.loginManager = async (req,res)=>{
    try{
      let {email, password } = req.body;
  
      let trainer = await managerModel.findOne({email});
      if(!trainer) return res.send("Email or password is incorrect");
      bcrypt.compare(password, manager.password, (err, result) =>{
        if(result){
          let token = generateToken(trainer);
          res.cookie("token", token);
          res.send("Manager logged in ");
        }
        else{
          req.send("Email or password is incorrect");
          return res.redirect('/');
        }
      })
    }
    catch(err){
      console.log(err.message);
    }
  }


  module.exports.logout = (req, res) => {
    res.cookie("token");
    res.redirect("/"); //home page
  };