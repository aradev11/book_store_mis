"use strict";

var router = require('express').Router();

var User = require('../models/user.model');

var _require = require('../security/validation'),
    regUserValidation = _require.regUserValidation,
    loginUserValidation = _require.loginUserValidation;

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var ErrorResponse = require("../utils/error.response");

router.post('/register', function _callee(req, res, next) {
  var _req$body, user_name, user_type, pwd, _regUserValidation, error, usernameExists, salt, hashedPwd, user, savedUsers;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, user_name = _req$body.user_name, user_type = _req$body.user_type, pwd = _req$body.pwd; // Check if Email invalid

          _regUserValidation = regUserValidation(req.body), error = _regUserValidation.error;

          if (!error) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", next(new ErrorResponse(error.details[0].message, 400)));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            user_name: user_name
          }));

        case 6:
          usernameExists = _context.sent;

          if (!usernameExists) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", next(new ErrorResponse("Username is taken!!!", 400)));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 11:
          salt = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(bcrypt.hash(pwd, salt));

        case 14:
          hashedPwd = _context.sent;
          // Creating New User
          user = new User({
            user_name: user_name,
            user_type: user_type,
            pwd: hashedPwd
          });
          _context.prev = 16;
          _context.next = 19;
          return regeneratorRuntime.awrap(user.save());

        case 19:
          savedUsers = _context.sent;
          res.status(200).json({
            success: true,
            user: savedUsers
          });
          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](16);
          next(_context.t0);

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[16, 23]]);
});
router.post('/login', function _callee2(req, res, next) {
  var _loginUserValidation, error, user, validPWD, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Check if Username invalid
          _loginUserValidation = loginUserValidation(req.body), error = _loginUserValidation.error;

          if (!error) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse(error.details[0].message, 400)));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            user_name: req.body.user_name
          }).select("+pwd"));

        case 6:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse("Username Or Password is Wrong!!!", 401)));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.pwd, user.pwd));

        case 11:
          validPWD = _context2.sent;

          if (validPWD) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse("Username Or Password is Wrong!!!", 401)));

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(jwt.sign({
            _id: user._id
          }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOEKN_EXPRIRE
          }));

        case 16:
          token = _context2.sent;
          // res.cookie('auth-token', token, { httpOnly: true, sameSite: true })
          // res.header('auth-token', token).send(token);
          res.status(201).json({
            success: true,
            token: token
          });
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 20]]);
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
router.put("/resetPWD", function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.send("Password Reset");

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.post('/forgotPWD', function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.send("Password Forgot");

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = router;