const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

//local mysql db connection
var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect(err => {
    if (err) {
        console.log(err);
    }
    console.log("connected to database");
});

module.exports = connection;