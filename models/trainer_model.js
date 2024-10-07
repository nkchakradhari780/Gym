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
    role: {
        type: String,
        enum: ['owner', 'trainer', 'manager', 'customer'],
        default: 'trainer'
    },
    trainningPlans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
    }],
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    }],
     // Attendance - storing attendance records as an array of dates
    attendance: [
        {
            date: {
                type: Date,
                required: true,
            },
            status: {
                type: String,
                enum: ['Present', 'Absent'], // Trainer can be marked as 'Present' or 'Absent'
                required: true,
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("trainer",trainerSchema);