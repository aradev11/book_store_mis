const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const bookDetailSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        ref: "books"
    },
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
});

module.exports = mongoose.model("book_detail", bookDetailSchema);