const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    lname: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    pwd: {
        type: String,
        required: true,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('user', userSchema);