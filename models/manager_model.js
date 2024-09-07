const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    contact: Number,
    address: String,
    aadharNo: String,
    dob: Date,
    age: Number,
    salary: Number,
    Photo: String,
    managerId: String,
    // trainers: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: trainer
    // }]
})

module.exports = mongoose.model("manager", managerSchema);
