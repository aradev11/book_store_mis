const router = require('express').Router();
const User = require('../models/user.model');
const { regUserValidation, loginUserValidation } = require('../security/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    // Check if Email invalid
    const { error } = regUserValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Check if Email is already Exists
    const emailExists = await User.findOne({ user_name: req.body.user_name });
    if(emailExists) return res.status(400).send("Email is Already Exsits");
    // Making Pasword Hash For more Seacurity
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.pwd, salt);

    // Creating New User
    const user = new User({
        user_name: req.body.user_name,
        user_type: req.body.user_type,
        pwd: hashedPwd
    });
    try {
        const savedUsers = await user.save();
        res.send(savedUsers);
    } catch (err) {
        res.status(300).send(err)
    }
});

router.post('/login', async (req, res) => {
    // Check if Username invalid
    const { error } = loginUserValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Check if Username is already Exists
    const user = await User.findOne({ user_name: req.body.user_name });
    if(!user) return res.status(400).send("Username is Wrong");
    // Check dehash password and check it for login
    const validPWD = await bcrypt.compare(req.body.pwd, user.pwd);
    if(!validPWD) return res.status(400).send("Invalid Password");
    
    // Create and Assign a token
    const token = await jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET, { expiresIn: "5000" });

    res.cookie('auth-token', token, { httpOnly: true, sameSite: true })
    res.header('auth-token', token).send(token);
    const { user_name, user_type } = user;
    res.status(200).json({ isAuth: true, user: { user_name, user_type }})
});


router.post('/logout', async (req, res) => {
    res.clearCookie('auth-token');
    res.status(201).send({ user: { user_name: "", user_type: "" }, success: true })
})

module.exports = router;