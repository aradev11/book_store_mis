const mongoose = require('mongoose');

const conn = async () => {
    await mongoose
    .connect(process.env.DB_CONN, { 
        useNewUrlParser: true,  
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
    .then(() => {
        console.log("DB Successfully Connected");
    })
    .catch (err => {
        console.log("DB_Err: " + err);
    });
}

module.exports = conn;