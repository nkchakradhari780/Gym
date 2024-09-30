const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const trainerModel = require("../models/trainer_model");
const customerModel = require("../models/costumer_model");
const { generateToken } = require("../utils/generatetoken");

module.exports.loginTrainer = async (req, res) => {
  try {
    let { email, password } = req.body;

    let trainer = await trainerModel.findOne({ email });
    if (!trainer) return res.send("Email or password is incorrect");
    bcrypt.compare(password, trainer.password, (err, result) => {
      if (result) {
        let token = generateToken(trainer);
        res.cookie("token", token);
        res.send("Trainer loged in");
      } else {
        req.send("Email or password is incorrect");
        return res.redirect("/");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.registerTrainer = async (req, res) => {
  try {
    let {
      fullName,
      email,
      password,
      contact,
      address,
      salary,
      age,
      trainerID,
    } = req.body;

    let existingTrainer = await trainerModel.findOne({ email });
    if (existingTrainer) 
      return res.status(401).send("Trainer Alredy Exists");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) 
          return res
            .send(err.message);
        else {
          let trainer = await trainerModel.create({
            fullName,
            email,
            password: hash,
            contact,
            address,
            salary,
            age,
            trainerID,
          });
          res.send("Trainer Created");
        }
      });
    });
  } catch (err) {}
};

module.exports.updateTrainer = async (req, res) => {
  try {
    let { salary,  address, contact, email } = req.body;

    let trainer = await trainerModel.findOneAndUpdate(
      { email },
      { salary,  address, contact },
      { new: true }
    );
    if (!trainer) return res.status(401).send("Something went wrong");
    res.send(trainer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

module.exports.checkAttendence = async (req, res) => {
  const { email } = req.body;

  try {
    const trainer = await trainerModel.findById(email);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.status(200).json(trainer.attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteTrainer = async (req, res) => {
  try {
    let { email } = req.body;

    let trainer = await trainerModel.findOneAndDelete({ email });
    if (!trainer) return res.status(401).send("Something Went Wrong");
    res.send("Trainer Deleted");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.listTrainers = async (req, res) => {
  try {
    // Fetch list of all trainers
    let trainerList = await trainerModel.find();
    
    // Get the total count of trainers
    let totalTrainers = await trainerModel.countDocuments();

    // Send response with the trainer list and total count
    res.status(200).json({
      total: totalTrainers,
      trainers: trainerList
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports.checkTrainerAttendence = async (req,res) =>{
  const {email} = req.body;

  try{
    const trainer = await trainerModel.findOne({email});

    if(!trainer){
      return res.status(404).json({message: "Trainer not found"});
    }

    res.status(200).json(trainer.attendance || []);
  }
  catch(err){
    console.error(err);
    res.status(500).json({message: "Server error"});
  }
};


module.exports.trainerAttendence = async (req,res) =>{
  const {email, date, status } = req.body;

  try{
    const trainer = await trainerModel.findOne({email});

    if(!trainer){
      return res.status(404).json({message: "Trainer not found"});
    }

    if(!trainer.attendance){
      trainer.attendance = [];
    }

    const existingAttendance = trainer.attendance.find(
      (att) => att.date.toDateString() === new Date(date).toDateString()
    );

    if (existingAttendance) {
      return res
        .status(400)
        .json({message: "Attendence for this date already marked"});
    }

    trainer.attendance.push({date: new Date(date), status});

    await trainer.save();
    res
      .status(200)
      .json({message: "Attendence marked successfully", trainer});
  }
  catch(err){
    console.error(err);
    res.status(500).json({message: "Server error"})
  }
}

module.exports.logout = (req, res) => {
  res.cookie("token");
  res.redirect("/"); //home page
};
