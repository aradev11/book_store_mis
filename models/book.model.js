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
        view: {
            type: Number,
            required: true,
            default: 0
        },
        content: {
            type: String,
            required: true,
            min: 10,
            max: 255
        },
        shelf: {
            type: String,
            min: 6,
            max: 150,
            required: true
        },
        publisher: {
            type: ObjectId,
            ref: "publisher"
        },
        pdf: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        transilator: {
            type: ObjectId,
            ref: "transilator"
        },
        enter: {
            type: Date, 
            required: true,
            default: Date.now
        },
        pub_date: {
            type: Date,
            required: true,
            default: Date.now
        } 
    }
});

module.exports = mongoose.model("books", bookSchema);