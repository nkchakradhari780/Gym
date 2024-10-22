const mongoose = require('mongoose');

const equipmentSchema = mongoose.Schema({
    id: String,
    name: String,
    status: {
        type: String,
        enum: ['Abailable', 'Unavailable', 'Undermaintainence'], 
        required: true,
    }
})

module.exports = mongoose.model("equipment", equipmentSchema);
