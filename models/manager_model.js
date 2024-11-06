const mongoose = require("mongoose");

const managerSchema = mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  contact: { 
    type: Number, 
    required: true 
  },
  address: { 
    type: String 
  },
  aadharNo: { 
    type: String ,
    required: true
  },
  age: { type: Number },
  salary: { type: Number },
  Photo: { type: Buffer },
  managerId: { type: String },
  joinDate: {
    type: Date,
    default: Date.now, // Corrected default for date
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"], // Corrected enum syntax
    required: true,
  },
  role: {
    type: String,
    enum: ['owner', 'trainer', 'manager', 'customer'],
    default: 'customer'
  },
  trainers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "trainer",
    },
  ],
});

module.exports = mongoose.model("manager", managerSchema);
