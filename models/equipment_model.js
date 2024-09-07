const mongoose = require('mongoose');

const equipmentSchema = mongoose.Schema({
    id: String,
    name: String,
    condition: String    
})

module.exports = mongoose.model("equipment", equipmentSchema);
