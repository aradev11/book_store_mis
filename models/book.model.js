const { Double } = require("mongodb");
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
        min: 6
    },
    author: {
        aut_id: {
            type: String,
            required: true,
        },
        aut_name: {
            type: String,
            required: true,
        },
        aut_lname: {
            type: String,
            required: true
        }
    },
    cat: {
        cat_id: {
            type: String,
            required: true,
        },
        cat_name: {
            type: String,
            required: true,
        }
    },
    lang: {
        lang_id: {
            type: String,
            required: true,
        },
        lang_name: {
            type: String,
            required: true,
        }
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
        unit_id: {
            type: String,
            required: true
        },
        unit_type: {
            type: String,
            required: true
        }
    },
    price: {
        type: Number,
        required: true
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
            pub_id: {
                type: String,
                required: true,
            },
            pub_name: {
                type: String,
                required: true,
            }
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
            trans_id: {
                type: String,
                
            },
            trans_name: {
                type: String,
                
            },
            trans_lname: {
                type: String,
                
            }
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