"use strict";

require('dotenv').config();

var express = require('express');

var app = express();

var mongoose = require('mongoose');

var morgan = require("morgan");

var cores = require('cors');

var bodyParser = require('body-parser');

var db = require('./config/db.config');

var errorHandler = require('./middleware/error'); // Import Rotues


var authRoute = require('./router/auth');

var postRoute = require("./router/posts");

var bookRoute = require("./router/book");

var authorRoute = require("./router/author");

var transilatorRoute = require("./router/transilator");

var customerRoute = require("./router/customer");

var countryRoute = require('./router/country');

var cityRoute = require("./router/city");

var employeeRoute = require('./router/employee'); // Process Envirnment Secrit Configes


var PORT = process.env.PORT || 5000; //Database Connection

db(); //MiddleWares

app.use(express.json());
app.use(cores()); //configure body parser

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // confiure moregam -- Morgan is a logger tool used to log all requests made on the server
// app.use(morgan("dev"));
// Router MiddleWares

app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/book', bookRoute);
app.use('/api/author', authorRoute);
app.use('/api/transilator', transilatorRoute);
app.use('/api/customer', customerRoute);
app.use('/api/country', countryRoute);
app.use('/api/city', cityRoute);
app.use('/api/employee', employeeRoute); // Last MiddlerWare Should be Error Handler Message Response

app.use(errorHandler);
var server = app.listen(PORT, function (req, res) {
  console.log("SERVER IS RUNNING ON POST:[".concat(PORT, "]"));
});
process.on("unhandledRejection", function (err, promise) {
  console.log("Logged Error: ".concat(err));
  server.close(function () {
    return process.exit(1);
  });
});