const ErrorResponse = require("../utils/error.response");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    if(err.code === 11000) {
        const message = `Duplicated Feild Value Enter`;
        error = new ErrorResponse(message, 400);
    }

    if(err.name === "ValidationError") {
        const message = Object.values(err.error).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statuseCode || 500).json({
        success: false,
        error: error.message || "SERVER ERROR"
    })
}

module.exports = errorHandler;