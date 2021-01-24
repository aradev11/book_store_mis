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

// Process Envirnment Secrit Configes
env.config();

//Database Connection
mongoose
    .connect(process.env.DB_CONN, { 
        useNewUrlParser: true,  
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false  })
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
app.use('/api/posts', postRoute);

app.listen(process.env.PORT || 4000, (req, res) => {
    console.log("SERVER IS STILL RUNNING")
});
