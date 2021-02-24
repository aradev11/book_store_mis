const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
        required: true
    },
    website: {
        type: String,
    },
    addresses: [
        {
            street: {
                type: String,
                required: true,
                min: 6
            },
            street2: {
                type: String,
                min: 6
            },
            country: {
                type: ObjectId,
                ref: "countries"
            },
            city: {
                type: ObjectId,
                ref: "cities"
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("publisher", publisherSchema);
