const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lang: [
        {
        type: String,
        required: true
        }
    ],
    code: {
        type: Number,
        required: true
    },
    cities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cities"
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("countries", countrySchema);