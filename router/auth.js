const router = require('express').Router();
const User = require('../models/user.model');
const { regUserValidation, loginUserValidation } = require('../security/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorResponse = require("../utils/error.response");
const crypto = require("crypto");
const sendEmail = require('../utils/send.email');
const verfied = require('../middleware/error');

router.post('/register', async (req, res, next) => {
    const { user_name, user_email, user_type, pwd } = req.body;
    // Check if Email invalid
    const { error } = regUserValidation(req.body);
    if(error) return next(new ErrorResponse(error.details[0].message, 400));
    // Check if Username is already Exists
    const usernameExists = await User.findOne({ user_name, user_email });
    if(usernameExists) return next(new ErrorResponse("Username is taken!!!", 400));
    // Check if Email is already Exists
    const emailExists = await User.findOne({ user_email });
    if(emailExists) return next(new ErrorResponse(`There is Already Account With This - ${user_email} - Email Address!!!`, 400));
    // Making Pasword Hash For more Seacurity
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(pwd, salt);

    // Creating New User
    const user = new User({
        user_name,
        user_type,
        user_email,
        pwd: hashedPwd
    });
    try {
        await user.save();
        res.status(201).json({success: true, message: "sucess"})
    } catch (err) {
        next(err)
    }
});

router.post('/login', async (req, res, next) => {
    const { user_name, pwd } = req.body;
    try {
        // Check if Username invalid
        const { error } = loginUserValidation(req.body);
        if(error) return next(new ErrorResponse(error.details[0].message, 400));
        // Check if Username is already Exists
        const user = await User.findOne({ user_name }).select("+pwd");
        if(!user) return next(new ErrorResponse("Username Or Password is Wrong!!!", 401));
        // Check dehash password and check it for login
        const validPWD = await bcrypt.compare(pwd, user.pwd);
        if(!validPWD) return next(new ErrorResponse("Username Or Password is Wrong!!!", 401));
        
        // Create and Assign a token
        const token = await jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET, { expiresIn: process.env.TOEKN_EXPRIRE });
    

        res.status(201).json({ token, role: user.user_type});
    } catch (err) {
        next(err);
    }
});


router.post('/forgotpassword', async (req, res, next) => { 
    const { user_email } = req.body;
    
    try {
        const user = await User.findOne({ user_email });
        // Check if user with reqest email account is exists
        if(!user) return next(new ErrorResponse("Sorry! This Account does not exists yet...", 404));

        // Gerenrate the reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        user.reset_pwd_token = crypto.createHash('sha256').update(resetToken).digest("hex");
        user.reset_pwd_exp = Date.now() + 10 * (60 * 100);
    
        // Save user after save
        await user.save();
        // Create URL to send for user email address
        const resetURL =  `http://localhost:5000/reset-password/ ${resetToken}`;

        const message = 
        `
        <h1>Hello ${user.user_name}<h1>
        <p>You are support with <a href="https://facebook.com/alireza.ehaam.mohsini">Aireza Mohsini</a> Fullstack JS developer</p>
        <p>There ${user.user_name} You have been reguest to ARA.DEV should reset your password or you have been forgot your password</p>
        <p>Please Click this Link <a href=${resetURL}>${resetURL}</a> to reset your account password </p>
        <h4>ARA.DEV - TEHAM</h4>
        <h4>THANK YOU</h4>
        <h6>&copy; 2020 ARA.DEV All right Reversed</h6>
        `
        try {
            await sendEmail({
                to: user.user_email,
                subject: `REQEST FOR RESET ${user.user_name} ACCOUNT PASSWORD`,
                text: message
            })

            res.status(200).json({ success: true, data: "Email Sent Successfully"});
        } catch (err) {
            user.reset_pwd_token = undefined;
            user.reset_pwd_exp = undefined;

            await user.save();

            res.next(new ErrorResponse("Email Could not Send"));
        }

    } catch (err) {
        next(err)
    }
})

router.put("/resetpassword/:token", async (req, res) => {
    const reset_pwd_token = crypto.createHash("sha256").update(res.params.token).digest("hex");

    try {
        const user = User.findOne({
            reset_pwd_token,
            reset_pwd_exp: { $gt: Data.now() },
        })

        if(!user) return next(new ErrorResponse("Invalid Reset Token", 400));

        user.pwd = req.body.pwd;
        user.reset_pwd_exp = undefined;
        user.reset_pwd_token = undefined;

        await user.save()

        res.status(200).json({
            success: true,
            data: "Account Reset Successfully"
        })
    } catch (err) {
        next(err);
    }
})



module.exports = router;