const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

// CREATING EMPLOYEE SCHEMA
const employeeSchema = new mongoose.Schema({
    id_card: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    last_name: {
        type: String,
        required: true,
        max: 100
    },
    father_name: {
        type: String,
        max: 100
    },
    describe: {
        type: String,
        maxlength: 255,
    },
    gender: {
        type: String,
        enum: ["M", "F", "O"],
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: false
    },
    contract: [
        {
            type: ObjectId,
            ref: "contracts"
        }
    ],
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    auth: {
        type: ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now,
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
                ref: "citry"
            }
        }
    ]
});

module.exports = mongoose.model("employees", employeeSchema);