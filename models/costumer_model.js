const mongoose = require('mongoose');

const costumerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    contact: Number,
    // photo: Buffer,
    address: String,
    weight: Number,
    age: Number,
    startDate: Date,
    endDate: Date,
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