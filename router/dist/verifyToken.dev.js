"use strict";

var jwt = require('jsonwebtoken'); // You can call this function inside any router you want to be protected or be private


module.exports = function (req, res, next) {
  var token = req.header('auth-token');
  if (!token) return res.status(401).send("Access Denid");

  try {
    var verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};