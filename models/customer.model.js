const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    id_card: {
        type: Number
    },
    first_name: {
        type: String,
        required: true,
        max: 100
    }, 
    last_name: {
        type: String,
        required: true,
        max: 100,
    },
    is_active: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max:100
    },
    phone: {
        type: Number,
        required: true,
    },
    code: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    addresses: [{
        street: {
            type: String,
            required: true,
            max: 100,
        },
        street2: {
            type: String,
            max: 100,
        },
        address_type: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 1
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cities"
        },
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'countries'
        }
    }]

});

module.exports = mongoose.model("cutomer", customerSchema);