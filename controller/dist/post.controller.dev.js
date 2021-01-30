"use strict";

var Post = require('../models/post.model'); //Import Post Validation


var _require = require('../security/validation'),
    postValidation = _require.postValidation; // Get All date from Database


exports.allPosts = function _callee(req, res) {
  var allPosts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Post.find());

        case 3:
          allPosts = _context.sent;
          res.send(allPosts);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.send(400).json(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Get All date by Id


exports.singlePost = function _callee2(req, res) {
  var singlePost;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          singlePost = _context2.sent;
          res.send(singlePost);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Post Data to Datebase


exports.addPost = function _callee3(req, res) {
  var _postValidation, error, postExists, newPost, savedPost;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Check if post invalid
          _postValidation = postValidation(req.body), error = _postValidation.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(Post.findOne({
            title: req.body.title
          }));

        case 5:
          postExists = _context3.sent;

          if (!postExists) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("Post is Already Exsits"));

        case 8:
          newPost = new Post({
            title: req.body.title,
            text: req.body.text,
            postBy: req.body.postBy
          });
          _context3.prev = 9;
          _context3.next = 12;
          return regeneratorRuntime.awrap(newPost.save());

        case 12:
          savedPost = _context3.sent;
          res.status(201).json(savedPost);
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](9);
          res.status(400).json(_context3.t0);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[9, 16]]);
}; // Edit each Post by Id of any post


exports.updatePost = function _callee4(req, res) {
  var _postValidation2, error, updateResult;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // Check if post invalid
          _postValidation2 = postValidation(req.body), error = _postValidation2.error;

          if (!error) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(req.params.id, req.body));

        case 6:
          updateResult = _context4.sent;
          res.status(200).json(updateResult);
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](3);
          res.status(500).json(_context4.t0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

exports.deletePost = function _callee5(req, res) {
  var deletedpost;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Post.remove({
            _id: req.params.id
          }));

        case 3:
          deletedpost = _context5.sent;

          if (deletedpost) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(401).send("There is no post with id of: ".concat(req.params.id)));

        case 6:
          res.status(200).send("Post with id of: ".concat(req.params.id, "  is deleted Success fully"));
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            message: _context5.t0
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};