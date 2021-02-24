require('dotenv').config();
const express = require('express');
const app = express();
const cores = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db.config');
const errorHandler = require('./middleware/error');
const morgan = require('morgan');

// Import Rotues
const authRoute  = require('./router/auth');
const postRoute = require("./router/posts");
const bookRoute = require("./router/book");
const authorRoute = require("./router/author");
const transilatorRoute = require("./router/transilator");
const customerRoute = require("./router/customer");
const countryRoute = require('./router/country');
const cityRoute = require("./router/city");
const employeeRoute = require('./router/employee');
const categoryRoute = require('./router/category');
const unitRoute = require('./router/unit');
const publisherRoute = require("./router/publisher");

// Process Envirnment Secrit Configes
const PORT  = process.env.PORT || 5000;

//Database Connection
db();

//MiddleWares
app.use(express.json());
app.use(cores());
//configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// confiure moregam -- Morgan is a logger tool used to log all requests made on the server
app.use(morgan("dev"));

// Router MiddleWares
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/book', bookRoute);
app.use('/api/author', authorRoute);
app.use('/api/transilator', transilatorRoute );
app.use('/api/customer', customerRoute);
app.use('/api/country', countryRoute);
app.use('/api/city', cityRoute);
app.use('/api/employee', employeeRoute);
app.use('/api/category', categoryRoute);
app.use('/api/unit', unitRoute);
app.use('/api/publisher', publisherRoute);

// Last MiddlerWare Should be Error Handler Message Response
app.use(errorHandler); 

const server = app.listen(PORT, (req, res) => {
    console.log(`SERVER IS RUNNING ON POST:[${PORT}]`)
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})
