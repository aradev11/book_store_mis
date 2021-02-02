"use strict";

var router = require('express').Router();

var User = require('../models/user.model');

var _require = require('../security/validation'),
    regUserValidation = _require.regUserValidation,
    loginUserValidation = _require.loginUserValidation;

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

router.post('/register', function _callee(req, res) {
  var _regUserValidation, error, emailExists, salt, hashedPwd, user, savedUsers;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Check if Email invalid
          _regUserValidation = regUserValidation(req.body), error = _regUserValidation.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            user_name: req.body.user_name
          }));

        case 5:
          emailExists = _context.sent;

          if (!emailExists) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Email is Already Exsits"));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 10:
          salt = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.pwd, salt));

        case 13:
          hashedPwd = _context.sent;
          // Creating New User
          user = new User({
            user_name: req.body.user_name,
            user_type: req.body.user_type,
            pwd: hashedPwd
          });
          _context.prev = 15;
          _context.next = 18;
          return regeneratorRuntime.awrap(user.save());

        case 18:
          savedUsers = _context.sent;
          res.send(savedUsers);
          _context.next = 25;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](15);
          res.status(300).send(_context.t0);

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[15, 22]]);
});
router.post('/login', function _callee2(req, res) {
  var _loginUserValidation, error, user, validPWD, token, user_name, user_type;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Check if Username invalid
          _loginUserValidation = loginUserValidation(req.body), error = _loginUserValidation.error;

          if (!error) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            user_name: req.body.user_name
          }));

        case 5:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("Username is Wrong"));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.pwd, user.pwd));

        case 10:
          validPWD = _context2.sent;

          if (validPWD) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("Invalid Password"));

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(jwt.sign({
            _id: user._id
          }, process.env.TOKEN_SECRET, {
            expiresIn: "5000"
          }));

        case 15:
          token = _context2.sent;
          res.cookie('auth-token', token, {
            httpOnly: true,
            sameSite: true
          });
          res.header('auth-token', token).send(token);
          user_name = user.user_name, user_type = user.user_type;
          res.status(200).json({
            isAuth: true,
            user: {
              user_name: user_name,
              user_type: user_type
            }
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/logout', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.clearCookie('auth-token');
          res.status(201).send({
            user: {
              user_name: "",
              user_type: ""
            },
            success: true
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;