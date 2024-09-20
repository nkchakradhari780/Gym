const mongoose = require('mongoose');

const costumerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    contact: Number,
    // photo: Buffer,
    address: String,
    weight: Number,
    age: Number,
    startDate: Date,
    endDate: Date,
    // time: String,
    joinedPlans:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
    }],
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trainer'
    },
    ditePlans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'diteplans'
    }],
    attendance: [
        {
            date: {
                type: Date,
                required: true,
            },
            status: {
                type: String,
                enum: ['Present', 'Absent'], 
                required: true,
            },
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("costumer",costumerSchema);