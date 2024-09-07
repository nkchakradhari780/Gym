const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    planID: String,
    level: String,
    price: Number,
    duration: Number,       // In Days 
    createDate: Date,
    facilities: [{
        type: String
    }],
    ditePlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ditePlan
    },
})

module.exports = mongoose.model("plan",planSchema);
