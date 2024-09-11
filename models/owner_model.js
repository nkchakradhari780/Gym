const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    contact: Number,
    photo: String,
    address: String,
    aadharNo: String,
    age: Number,
    gym: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: gym
    }],
    
});

module.exports = mongoose.model("owner",ownerSchema);