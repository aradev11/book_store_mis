const mongoose = require('mongoose');

const tranislatorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    last_name: {
        type: String,
        required: true,
        min: 1, 
        max: 100,
    },
    img: {
        type: String,
    },
    about: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'countries'
    },
    website: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("transilator", tranislatorSchema);