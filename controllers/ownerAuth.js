const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner_model");
const userModel = require("../models/user_model")
const customerModel = require("../models/costumer_model")
const managerModel = require("../models/manager_model")
const trainerModel = require("../models/trainer_model")
const gymModel = require("../models/gym_model");
const { generateToken } = require("../utils/generateToken");

module.exports.registerOwner = async (req, res) => {
  try {
    let { fullname, email, password, contact, photo, address, aadharNo, age } =
      req.body;

    let owner = await userModel.findOne({ email });
    if (owner) return res.status(401).send("Owner Alredy Exists");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let owner = await userModel.create({
            fullname,
            email,
            password: hash,
            contact,
            photo,
            address,
            aadharNo,
            age,
            roel: 'admin'
          });
          console.log(owner);
          res.send("Owner Created");
        }
      });
    });
  } catch (err) {
    console.log(err.message);
    res.send("Something Went Wrong ");
  }
};

module.exports.loginOwner = async (req, res) => {
  try {
    let { email, password } = req.body;

    let owner = await userModel.findOne({ email });
    if (!owner) return res.send("Email or password is incorrect");
    bcrypt.compare(password, owner.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ ownerId: owner._id }, process.env.JWT_KEY);
        res.cookie("token", token, {
          httpOnly: true,
          secrure: false,
          maxAge: 3600000,
        });
        res
          .status(200)
          .json({
            success: true,
            message: "Owner LoggedIN Successfully",
            owner,
            token,
          });
      } else {
        res.send("Email or password is incorrect");
        return res.redirect("/");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};


module.exports.ownerDetails = async (req,res) => {
  try{
    email = req.email;
    let owner = await userModel.findOne({email})
    if(!owner){
      return res
        .status(404)
        .send("Owner Not Found")
    }

    res.status(200).json({
      owner
    })
  } catch (error){
    console.error(error)
    res.status(500).json({message: "server error"})
  }
}

module.exports.count = async (req,res) => {
  try{

    let customerCount = await customerModel.find().countDocuments() || 0;
    let managerCount = await managerModel.find().countDocuments() || 0;
    let trainerCount = await trainerModel.find().countDocuments() || 0;

    res.status(200).json({
      customerCount: customerCount,
      managerCount: managerCount, 
      trainerCount: trainerCount,
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'server error'});
  }
}