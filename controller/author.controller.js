const Author = require("../models/author.model");

// Import Author Validation
const { authorValidation } = require("../security/validation");

// ERROR
const ErrorResponse = require("../utils/error.response");

// Get all data from database
exports.allAuthor = async (req, res, next) => {
    try {
        const data = await Author.find().populate('country');
        if(data.length === 0) return next(new ErrorResponse("No Value", 400));

        res.status(200).json({success: true, data});
    } catch (err) {
        next(err);
    }
}

// Get single Value from database
exports.singleAuthor = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await Author.findById(id).populate('country');
        if(data.length === 0) return next(new ErrorResponse("No Value", 400));
        
        res.status(200).json({success: true, data});
    } catch(err) {
        next(err);
    }
}

// Post data to database
exports.postAuthor = async (req, res, next) => {
    const { first_name, last_name } = req.body;
    // Check if post invalid
    const { error } = authorValidation(req.body);
    if(error) return next(new ErrorResponse(error.details[0].message), 400);
    // Check if post is already Exists
    const authorExists = await Author.findOne({ first_name, last_name });
    if(authorExists) return next(new ErrorResponse("Value Already Exists", 204) );

    const newAuthor = new Author(req.body);
    try {
        const saved = await newAuthor.save();
        res.status(201).json({success: true, message: "Add Sucessfully"});
    } catch (err) {
        next(err);
    }
}

// delete Author from database
exports.deleteAuthor = async (req, res, next) => {
    try {
        const deleteAuthor = await Author.remove({_id: req.params.id});
        if(!deleteAuthor) return next(new ErrorResponse(`Can't Delete Author with id of: ${req.params.id}`, 401));

        res.status(200).json({success: true, message: `Author with id of ${req.params.id} Delete Successfully`});
    } catch (err) {
        next(err);
    }
}

// Update Author From databse
exports.updateAuthor = async (req, res, next) => {
    // Check if post invalid
    const { error } = authorValidation(req.body);
    if(error) return next(new ErrorResponse(error.details[0].message, 400));
    try {
        await Author.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({success: true, message: "Update Successfully"});
    } catch (err) {
        next(err);
    }
}