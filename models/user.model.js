const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        max: 255
    },
    user_email: {
        type: String,
        required: true
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
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('user', userSchema);