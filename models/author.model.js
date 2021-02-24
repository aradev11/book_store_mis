const mongoos = require("mongoose");

const authorSchema = new mongoos.Schema({
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
        default: "avatar-default.png"
    },
    about: {
        type: String,
        required: true
    },
    country: {
        type: mongoos.Schema.Types.ObjectId,
        ref: 'countries'
    },
    email: {
        type: String,
    },
    website: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoos.model("author", authorSchema);