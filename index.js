const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const morgan = require("morgan");
const cores = require('cors');
const bodyParser = require('body-parser');

// Import Rotues
const authRoute  = require('./router/auth');
const postRoute = require("./router/posts");
const bookRoute = require("./router/book");
const authorRoute = require("./router/author");
const transilatorRoute = require("./router/transilator");
const customerRoute = require("./router/customer");

// Process Envirnment Secrit Configes
env.config();

//Database Connection
mongoose
    .connect(process.env.DB_CONN, { 
        useNewUrlParser: true,  
        useUnifiedTopology: true,
        useCreateIndex: true  })
    .then(() => {
        console.log("DB Successfully Connected");
    })
    .catch (err => {
        console.log("DB_Err: " + err);
    });

//MiddleWares
app.use(express.json());
app.use(cores());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// confiure moregam -- Morgan is a logger tool used to log all requests made on the server
app.use(morgan("dev"));

// Router MiddleWares
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);
app.use('/api/book', bookRoute);
app.use('/api/author', authorRoute);
app.use('/api/transilator', transilatorRoute);
app.use('/api/customer', customerRoute);

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log(`SERVER IS RUNNING ON POST:[${process.env.PORT || 3000}]`)
});
