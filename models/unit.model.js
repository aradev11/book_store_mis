const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}); 

module.exports = mongoose.model("unit", unitSchema);