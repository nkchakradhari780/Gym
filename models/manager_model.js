const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    contact: Number,
    address: String,
    aadharNo: String,
    age: Number,
    salary: Number,
    Photo: Buffer,
    managerId: String,
    trainers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trainer'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("manager", managerSchema);
