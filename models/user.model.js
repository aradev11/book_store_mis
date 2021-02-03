const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        max: 255
    },
    pwd: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
        max: 1024
    },
    user_type: {
        type: String,
        required: true,
        enum: ["admin", "customer", "employee"]
    },
    reset_pwd_token: String,
    reset_pwd_exp: Date,
    is_active: {
        type: Boolean,
        default: false
    },
    emp: {
        type: ObjectId,
        ref: "employees"
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('user', userSchema);