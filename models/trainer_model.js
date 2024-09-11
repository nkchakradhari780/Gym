const mongoose = require('mongoose');

const trainerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    contact: Number,
    photo: String,
    address: String,
    salary: Number,
    age: Number,
    trainerID: String,
    // Time: Time,
    trainningPlans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
    }],
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    }]
});

module.exports = mongoose.model("trainer",trainerSchema);