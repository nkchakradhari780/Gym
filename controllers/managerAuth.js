const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const managerModel = require('../models/manager_model');
const planModel = require('../models/plan_module');
const trainerModel = require('../models/trainer_model');
const customerModel = require('../models/costumer_model');
const { generateToken } = require("../utils/generatetoken");

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

  module.exports.updateManager = async (req,res) => {
    try{
      let {email,fullname,contact,address,aadharNo,age} = req.body;

      let manager = await managerModel.findOneAndUpdate({email},{fullname,contact,address,aadharNo,age},{new: true}).send("Manager Udated successfully");
      if(!manager) return res.status(401).send("something went wrong")
      res.send(manager);
    }
    catch(err){
      console.log(err.messaage);
    }
  }
  
 
  module.exports.updateManager = async (req,res)=>{
    try{
      let {managerId,salary,aadharNo,address,contact,email} = req.body;

      let manager = await managerModel.findOneAndUpdate({email},{managerId,salary,aadharNo,address,contact},{new: true})
      if(!manager) return res.status(401).send("Something went wrong");
      res.send(manager);
    }
    catch(err){
      console.log(err.message);
    }
  }

  module.exports.deleteManager = async (req,res) =>{
    try{
      let {email} = req.body;

      let manager = await managerModel.findOneAndDelete({email});
      if(!manager) return res.status(401).send("Something went wrong");
      res.send("Manager Deleted");
    }
    catch(err){
      console.log(err.message);
    }
  }

// Route to mark attendance for a trainer

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
