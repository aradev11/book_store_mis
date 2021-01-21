const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');

// Import Rotues
const authRoute  = require('./router/auth');
const postRoute = require("./router/verifyToken");

// Process Envirnment Secrit Configes
env.config();

//Database Connection
mongoose.connect(
    process.env.DB_CONN || 3000,
    { useNewUrlParser: true },
    () => console.log('Connected Successfully')
);

//MiddleWares
app.use(express.json());

// Router MiddleWares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(process.env.PORT, (req, res) => {
    console.log("SERVER IS STILL RUNNING")
});
