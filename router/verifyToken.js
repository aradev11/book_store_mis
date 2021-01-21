const jwt = require('jsonwebtoken');

// You can call this function inside any router you want to be protected or be private
module.exports = (req, res, next) => {    
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Access Denid");

    try {
        const verfied = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verfied;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token")
    }
}
