const express = require('express');
const app = express();

require('dotenv').config();

// Import Rotues
const authRoute  = require('./router/auth');

// Router MiddleWares
app.use('/api/user', authRoute);

app.listen(process.env.PORT, (req, res) => {
    console.log("Server is Up and Running")
});
