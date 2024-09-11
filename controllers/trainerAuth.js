const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const trainerModel = require('../models/trainer_model')
const { generateToken } = require("../utils/generatetoken");



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
  
  module.exports.loginTrainer = async (req, res) => {
    try{
      let {email, password} = req.body;
  
      let trainer = await trainerModel.findOne({email});
      if(!trainer) return res.send("Email or password is incorrect");
      bcrypt.compare(password, trainer.password, (err,result)=>{
        if(result){
          let token = generateToken(trainer);
          res.cookie("token",token);
          res.send("Trainer loged in");
        }
        else{
          req.send("Email or password is incorrect");
          return res.redirect("/");
        }
      });
    }
    catch(err){
      console.log(err.message);
    }
  };
  
  module.exports.updateTrainer = async (req,res) =>{
    
  }
  
  
  module.exports.deleteTrainer = async (req,res) =>{

  }

  module.exports.logout = (req, res) => {
    res.cookie("token");
    res.redirect("/"); //home page
  };