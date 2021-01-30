"use strict";

var express = require('express');

var app = express();

var env = require('dotenv');

var mongoose = require('mongoose');

var morgan = require("morgan");

var cores = require('cors');

var bodyParser = require('body-parser'); // Import Rotues


var authRoute = require('./router/auth');

var postRoute = require("./router/posts");

var bookRoute = require("./router/book");

var authorRoute = require("./router/author");

var transilatorRoute = require("./router/transilator");

var customerRoute = require("./router/customer"); // Process Envirnment Secrit Configes


env.config(); //Database Connection

mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function () {
  console.log("DB Successfully Connected");
})["catch"](function (err) {
  console.log("DB_Err: " + err);
}); //MiddleWares

app.use(express.json());
app.use(cores()); //configure body parser

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // confiure moregam -- Morgan is a logger tool used to log all requests made on the server

app.use(morgan("dev")); // Router MiddleWares

app.use('/api/user', authRoute);
app.use('/api/post', postRoute);
app.use('/api/book', bookRoute);
app.use('/api/author', authorRoute);
app.use('/api/transilator', transilatorRoute);
app.use('/api/customer', customerRoute);
app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("SERVER IS RUNNING ON POST:[".concat(process.env.PORT || 3000, "]"));
});