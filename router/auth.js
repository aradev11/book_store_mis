const router = require('express').Router();
const User = require('../models/user.model');
const { regUserValidation, loginUserValidation } = require('../security/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorResponse = require("../utils/error.response");

router.post('/register', async (req, res, next) => {
    const { user_name, user_type, pwd } = req.body;
    // Check if Email invalid
    const { error } = regUserValidation(req.body);
    if(error) return next(new ErrorResponse(error.details[0].message, 400));
    // Check if Email is already Exists
    const usernameExists = await User.findOne({ user_name });
    if(usernameExists) return next(new ErrorResponse("Username is taken!!!", 400));
    // Making Pasword Hash For more Seacurity
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(pwd, salt);

    // Creating New User
    const user = new User({
        user_name,
        user_type,
        pwd: hashedPwd
    });
    try {
        const savedUsers = await user.save();
        res.status(200).json({
            success: true,
            user: savedUsers
        });
    } catch (err) {
        next(err)
    }
});

router.post('/login', async (req, res, next) => {
    try {
        // Check if Username invalid
        const { error } = loginUserValidation(req.body);
        if(error) return next(new ErrorResponse(error.details[0].message, 400));
        // Check if Username is already Exists
        const user = await User.findOne({ user_name: req.body.user_name }).select("+pwd");
        if(!user) return next(new ErrorResponse("Username Or Password is Wrong!!!", 401));
        // Check dehash password and check it for login
        const validPWD = await bcrypt.compare(req.body.pwd, user.pwd);
        if(!validPWD) return next(new ErrorResponse("Username Or Password is Wrong!!!", 401));
        
        // Create and Assign a token
        const token = await jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET, { expiresIn: process.env.TOEKN_EXPRIRE });

        // res.cookie('auth-token', token, { httpOnly: true, sameSite: true })
        // res.header('auth-token', token).send(token);
        res.status(201).json({ success: true, token});
    } catch (err) {
        next(err)
    }
});

router.post('/logout', async (req, res) => {
    res.clearCookie('auth-token');
    res.status(201).send({ user: { user_name: "", user_type: "" }, success: true })
})

router.put("/resetPWD", async (req, res) => {
    res.send("Password Reset");
})

router.post('/forgotPWD', async (req, res) => {
    res.send("Password Forgot");
})

module.exports = router;