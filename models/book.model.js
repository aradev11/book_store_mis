const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true,
        max: 100,
        min: 6,
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: "author"
    },
    cat: [
        {
            type: ObjectId,
            ref: "category"
        }
    ],
    lang: {
        type: String,
        required: true,
    },
    edition: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    volume: {
        type: Number,
        required: true,
        default: 0
    },
    wrapper: {
        type: Number,
        required: true
    },
    price: {
        unit: {
            type: ObjectId,
            ref: "unit"
        },
        payable: {
            type: Number,
            required: true,
            default: 0
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    details: {
        type: ObjectId,
        ref: 'book_details'
    }
});

module.exports = mongoose.model("books", bookSchema);