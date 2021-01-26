const mongoose = require("mongoose");

const bookDetailSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true,
        max: 100,
        min: 6,
    },
    view: {
        type: Number,
        required: true,
        default: 0
    },
    content: {
        type: String,
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
        type: Number,
        required: true
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
        type: Number,
        required: true,
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
});

module.exports = mongoose.model("bookDetail", bookDetailSchema);