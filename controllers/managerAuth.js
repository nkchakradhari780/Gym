const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const managerModel = require('../models/manager_model')
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
  
  module.exports.registerTrainer = async (req, res) => {
    try {
      let { fullName, email, password, contact, photo, address, salary, age, trainerID } = req.body;
  
      let trainer = await trainerModel.findOne({email});
      if(trainer)
          return res.status(401).send("Trainer Alredy Exists");
  
      bcrypt.genSalt(10, (err,salt) =>{
          bcrypt.hash(password, salt, async(err,hash)=>{
              if(err) return res.send(err.message)
              else{
                  let trainer = await trainerModel.create({
                      fullName,
                      email,
                      password: hash,
                      contact,
                      photo,
                      address,
                      salary,
                      age,
                      trainerID,
                  })
              }
          })
      })
    } catch (err) {}
  };

  module.exports.updateTrainer = async (req,res) =>{
    try{
      let {fullname,email,contact,address,salary,age,trainerID} = req.body;
  
      let trainer = await trainerModel.findOneAndUpdate({email},{fullname,contact,address,salary,age,trainerID},{new: true});
      if(!trainer) return res.status(401).send("Something Went Wrong");
      res.send(trainer);
    }
    catch(err){
      console.log(err.message);
    }
  }

  module.exports.deleteTrainer = async (req,res) =>{
    try{
      let {email} = req.body;

      let trainer = await trainerModel.findOneAndDelete({email});
      if(!trainer) return res.status(401).send("Something Went Wrong");
      res.send("Trainer Deleted")

    }
    catch(err){
      console.log(err.message);
    }
  }

  
  module.exports.logout = (req, res) => {
    res.cookie("token");
    res.redirect("/"); //home page
  };