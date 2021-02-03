"use strict";

var jwt = require('jsonwebtoken');

var User = require("../models/user.model");

var ErrorResponse = require("../utils/error.response"); // You can call this function inside any router you want to be protected or be private


module.exports = function _callee(req, res, next) {
  var token, verified, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
          }

          if (token) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", next(new ErrorResponse("NOT AUTHORIZED TO ACCESS THIS ROUTE", 401)));

        case 3:
          _context.prev = 3;
          verified = jwt.verify(token, process.env.TOKEN_SECRET);
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findById(verified._id));

        case 7:
          user = _context.sent;

          if (user) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", next(new ErrorResponse("NO user found with this id", 404)));

        case 10:
          req.user = user;
          next();
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", next(new ErrorResponse("NOT AUTHORIZED TO ACCESS THIE ROUTE", 401)));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 14]]);
}; // module.exports = function (req, res, next) {    
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