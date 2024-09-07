const mongoose = require('mongoose');

const trainerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    contact: Number,
    photo: String,
    address: String,
    salary: Number,
    dob: Date,
    trainerID: String,
    // Time: Time,
    trainningPlans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: plan
    }],
});

module.exports = mongoose.model("trainer",trainerSchema);