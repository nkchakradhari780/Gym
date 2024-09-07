const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    contact: Number,
    photo: String,
    address: String,
    aadharNo: String,
    dob: Date,
    age: Number,

});

module.exports = mongoose.model("owner",ownerSchema);