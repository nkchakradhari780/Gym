const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const customerModel = require('../models/costumer_model')
const { generateToken } = require("../utils/generatetoken");


module.exports.registerCustomer = async (req, res) => {
    try {
      let { email, fullname, password, contact, photo, address, weight, age } = req.body;
  
      let customer = await customerModel.findOne({ email: email });
      if (customer)
        return res.status(401).send("Customer Exists You need to Login");
  
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return res.send(err.message);
          else {
            let customer = await customerModel.create({
              email,
              fullname,
              contact,
              address,
              weight,
              age,
              password: hash,
              photo: req.file.buffer,
            });
            let token = generateToken(customer);
            res.cookie("token", token);
            res.send("customer created successfully");
          }
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  
  module.exports.loginCustomer = async (req, res) => {
    try {
      let { email, password } = req.body;
  
      let customer = await customerModel.findOne({ email });
      if (!customer) return res.send("Email or password is incorrect");
      bcrypt.compare(password, customer.password, (err, result) => {
        if (result) {
          let token = generateToken(customer);
          res.cookie("token", token);
          res.send("customer loged in");
        } else {
          req.send("Email or password is incorrect");
          return res.redirect("/");
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  module.exports.updateCustomer = async (req,res) =>{
    try{
      let { email, fullname, contact, address, weight, age}  = req.body;

      let customer = await customerModel.findOneAndUpdate({email},{fullname,contact,address, weight, age, startDate,endDate}, {new: true}).send("Customer Updated");
      if(!customer) return res.status(401).send("Something Went wrong");
      res.send(customer);
    }
    catch(err){
      console.log(err);
    }
  }
 
  // module.exports.deleteCustomer = async (req,res) =>{
  //   try{
  //     let {email} = req.body;

  //     let customer = await customerModel.findOneAndDelete({email});
  //     res.send('customer deleted');
  //   }
  //   catch(err){
  //     console.log(err.message);
  //   }
  // }

  module.exports.logout = (req, res) => {
    res.cookie("token");
    res.redirect("/"); //home page
  };  