"use strict";

var Employee = require('../models/employee.model');

var User = require("../models/user.model"); // IMPORT VALIDATIONS 


var _require = require('../security/validation'),
    employeeValidation = _require.employeeValidation,
    regUserValidation = _require.regUserValidation; // Get All Employess From databse 


exports.allEmployee = function _callee(req, res) {
  var _req$query, dtl, secret, allEmployees;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, dtl = _req$query.dtl, secret = _req$query.secret;
          allEmployees = "";
          console.log(dtl);
          _context.prev = 3;

          if (!(dtl == "show")) {
            _context.next = 10;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(Employee.find().populate('brand').populate('contract').populate('addresses.country').populate('addresses.city'));

        case 7:
          allEmployees = _context.sent;
          _context.next = 19;
          break;

        case 10:
          if (!(dtl == "show" && secret == "admin")) {
            _context.next = 16;
            break;
          }

          _context.next = 13;
          return regeneratorRuntime.awrap(Employee.find().populate('auth'));

        case 13:
          allEmployees = _context.sent;
          _context.next = 19;
          break;

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(Employee.find());

        case 18:
          allEmployees = _context.sent;

        case 19:
          if (!(allEmployees.length === 0)) {
            _context.next = 21;
            break;
          }

          return _context.abrupt("return", res.status(400).send("NO VALUE"));

        case 21:
          res.status(201).send(allEmployees);
          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](3);
          res.status(400).json(_context.t0);

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 24]]);
}; // Get Single Employee from database


exports.singleEmployee = function _callee2(req, res) {
  var _req$query2, dtl, secret, id, singleValue;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$query2 = req.query, dtl = _req$query2.dtl, secret = _req$query2.secret;
          id = req.params.id;
          singleValue = "";
          _context2.prev = 3;

          if (!(dtl === "show")) {
            _context2.next = 10;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(Employee.find(id).populate('brand').populate('contract').populate('addresses.country').populate('addresses.city'));

        case 7:
          singleValue = _context2.sent;
          _context2.next = 19;
          break;

        case 10:
          if (!(dtl === "show" && secret === "admin")) {
            _context2.next = 16;
            break;
          }

          _context2.next = 13;
          return regeneratorRuntime.awrap(Employee.find(id).populate('auth'));

        case 13:
          singleValue = _context2.sent;
          _context2.next = 19;
          break;

        case 16:
          _context2.next = 18;
          return regeneratorRuntime.awrap(Employee.find(id));

        case 18:
          singleValue = _context2.sent;

        case 19:
          if (!(singleValue.length == 0)) {
            _context2.next = 21;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("NO VALUE"));

        case 21:
          res.status(201).send(singleValue);
          _context2.next = 27;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](3);
          res.status(400).json(_context2.t0);

        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 24]]);
}; // Add Employee to Database 


exports.addEmployee = function _callee3(req, res) {
  var _employeeValidation, error, employeeExists, newEmployee, savedEmployee;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Check if Data is Validate
          _employeeValidation = employeeValidation(req.body), error = _employeeValidation.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(Employee.findOne({
            id_card: req.body.id_card,
            first_name: req.body.first_name,
            email: req.body.email
          }));

        case 5:
          employeeExists = _context3.sent;

          if (!employeeExists) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("Value Duplicated"));

        case 8:
          newEmployee = new Employee(req.body);
          _context3.prev = 9;
          _context3.next = 12;
          return regeneratorRuntime.awrap(newEmployee.save());

        case 12:
          savedEmployee = _context3.sent;

          if (savedEmployee) {
            _context3.next = 15;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("Entery Faild"));

        case 15:
          res.status(201).send("Add SuccessFully");
          _context3.next = 21;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](9);
          res.status(400).json(_context3.t0);

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[9, 18]]);
}; // Add User Account for Employee


exports.addUserAccount = function _callee4(req, res) {
  var user_name, id, _regUserValidation, error, accountExists, employee, newAccount;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user_name = req.body.user_name;
          id = req.params.id; // Check if Data is Validate

          _regUserValidation = regUserValidation(req.body), error = _regUserValidation.error;

          if (!error) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(400).send(error.details[0].message));

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            user_name: user_name
          }));

        case 7:
          accountExists = _context4.sent;

          if (!accountExists) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", res.status(400).send("".concat(user_name, " Account is Invalid")));

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(Employee.findById(id));

        case 12:
          employee = _context4.sent;
          // Create new Account
          newAccount = new User(req.body);
          _context4.prev = 14;
          // Assign New Account id to Employee Table
          newAccount.auth = employee; // save New Account id to Employee

          _context4.next = 18;
          return regeneratorRuntime.awrap(newAccount.save());

        case 18:
          // Add Employee Id to User Table 
          employee.emp.push(newAccount); // Save the Employee User

          _context4.next = 21;
          return regeneratorRuntime.awrap(employee.save());

        case 21:
          res.status(201).send("Account Created Successfully");
          _context4.next = 27;
          break;

        case 24:
          _context4.prev = 24;
          _context4.t0 = _context4["catch"](14);
          res.status(400).json(err);

        case 27:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[14, 24]]);
}; // Delete Employee and User Account with user id


exports.deleteEmployee = function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // Edit Employee 


exports.editEmployee = function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
        case "end":
          return _context6.stop();
      }
    }
  });
};