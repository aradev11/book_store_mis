const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true,
        max: 100,
        min: 6,
    },
    name: {
        type: String,
        required: true,
        max: 100,
        min: 6,
        default: ""
    },
    author: {
        type: Number,
        required: true,
    },
    cat: {
        type: Number,
        required: true
    },
    lang: {
        type: Number,
        required: true
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
    unit: {
        type: Number, 
        required: true,
    },
    price: {
        type: Number,
        required: true
    }    
});

module.exports = mongoose.model("books", bookSchema);