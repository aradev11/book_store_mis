"use strict";

var mongoose = require('mongoose');

var conn = function conn() {
  return regeneratorRuntime.async(function conn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.DB_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
          }).then(function () {
            console.log("DB Successfully Connected");
          })["catch"](function (err) {
            console.log("DB_Err: " + err);
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = conn;