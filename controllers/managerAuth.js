const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const managerModel = require('../models/manager_model');
const { generateToken } = require("../utils/generatetoken");

module.exports.loginManager = async (req, res) => {
  try {
    let { email, password } = req.body;

    let manager = await managerModel.findOne({ email });
    // Changed 'trainer' to 'manager' for the correct variable
    if (!manager) return res.status(401).send("Email or password is incorrect");

    bcrypt.compare(password, manager.password, (err, result) => {
      if (err) return res.status(500).send("Error occurred while comparing passwords");
      if (result) {
        let token = generateToken(manager); // Changed 'trainer' to 'manager'
        res.cookie("token", token);
        return res.send("Manager logged in");
      } else {
        return res.status(401).send("Email or password is incorrect");
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

module.exports.updateManager = async (req, res) => {
  try {
    let {salary, address, contact, email } = req.body;

    let manager = await managerModel.findOneAndUpdate(
      { email },
      { salary, address, contact },
      { new: true }
    );
    if (!manager) return res.status(401).send("Something went wrong");
    res.send(manager);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

module.exports.deleteManager = async (req, res) => {
  try {
    let { email } = req.body;

    let manager = await managerModel.findOneAndDelete({ email });
    if (!manager) return res.status(401).send("Manager not found or something went wrong");
    res.send("Manager deleted successfully");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

module.exports.registerManager = async (req, res) => {
  try {
    let { fullName, email, password, contact, address, aadharNo, age, salary, photo, managerId } = req.body;

    let existingManager = await managerModel.findOne({ email });
    if (existingManager) return res.status(401).send("Manager already exists. Please login.");

    bcrypt.genSalt(10, (err, salt) => {
      // Added error handling for salt generation
      if (err) return res.status(500).send("Error occurred while generating salt");

      bcrypt.hash(password, salt, async (err, hash) => {
        // Added error handling for password hashing
        if (err) return res.status(500).send("Error occurred while hashing the password");

        try {
          let newManager = await managerModel.create({
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
          });
          // Added response after successful registration
          res.send("Manager registered successfully");
        } catch (err) {
          console.log(err.message);
          res.status(500).send("Server error");
        }
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};


module.exports.logout = (req, res) => {
  res.cookie("token");
  res.redirect("/"); //home page
};
