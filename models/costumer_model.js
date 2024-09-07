const mongoose = require('mongoose');

const costumerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    contact: Number,
    photo: String,
    address: String,
    weight: Number,
    dob: Date,
    age: Number,
    startDate: Date,
    endDate: Date,
    // time: String,
    joinedPlans:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: plan
    }],
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: trainer,
    },
    ditePlans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: diteplans
    }],
});

module.exports = mongoose.model("costumer",costumerSchema);