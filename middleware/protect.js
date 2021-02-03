const jwt = require('jsonwebtoken');
const User = require("../models/user.model");
const ErrorResponse = require("../utils/error.response");

// You can call this function inside any router you want to be protected or be private
module.exports = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token) return next(new ErrorResponse("NOT AUTHORIZED TO ACCESS THIS ROUTE", 401));

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await User.findById(verified._id);

        if(!user) return next(new ErrorResponse("NO user found with this id", 404));

        req.user = user;
        
        next();
    } catch (err) {
        return next(new ErrorResponse("NOT AUTHORIZED TO ACCESS THIE ROUTE", 401))
    }
}



// module.exports = function (req, res, next) {    
//     const token = req.header('auth-token'); 
//     if(!token) return res.status(401).send("Access Denid");

//     try {
//         const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).send("Invalid Token");
//     }
// }
