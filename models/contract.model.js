const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types.ObjectId;

// CREATING CONTACT SCHEMA
const ContractSchema = new mongoose.Schema({
    contract_id: {
        type: String,
        required: true,
        minlength: 6
    },
    employee_id: {
        type: ObjectId,
        ref: 'employees'
    },
    contract_type: {
        type: String,
        required: true,
        enum: ["L", "T", "I"],
        minlength: 1,
    },
    present_time: {
        type: String,
        required: true,
        enum: ['F', 'P']
    },
    contract_date: {
        type: Date,
        required: true
    },
    duration: [{
        type: {
            type: String,
            enum: ["Y", "M", "W"]
        },
        time: {
            type: Number,
        }
    }],
    sallary: [{
        unit: {
            type: ObjectId,
            ref: 'unit',
            required: true
        },
        amount: {
            type: Number,
            required: true,
            default: 0
        },
        tax: {
            type: Number,
            required: true,
            default: 15
        }
    }],
    position: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("contract", ContractSchema);