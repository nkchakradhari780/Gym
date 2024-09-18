const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    planID: String,
    level: String,
    planName: String,
    price: Number,
    duration: Number,       // In Days 
    category: String,
    createDate: {
        type: Date,
        default: Date.now
    },
    facilities: [{
        type: String
    }]
})

module.exports = mongoose.model("plan",planSchema);
