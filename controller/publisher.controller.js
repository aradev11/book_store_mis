// Model
const Publisher = require("../models/publisher.model");
// Validation
const { publisherValidation } = require('../security/validation');
// ERROR
const ErrorResponse = require("../utils/error.response");

// Routes
// Get all Value from DB
exports.getAllPublisher = async (req, res, next) => {
    try {
        const data = await Publisher.find()
        .populate('addresses.country')
        .populate('addresses.city');
        if(data.length === 0) return next(new ErrorResponse("No Value", 400));

        res.status(200).json({success: true, data});
    } catch (error) {
        next(error);
    }
}

exports.getSinglePublisher = async (req, res, next) => {
    const { id } = req.params;
    try {  
        const data = await Publisher.findById(id).populate('country');
        if(data.length === 0) return next(new ErrorResponse("No Value", 400));

        res.status(200).json({success: true, data});
    } catch (error) {
        next(error);
    }
}

exports.addPublisher = async (req, res, next) => {
    const { name, email } = req.body;
    // Check if Data in Invalid
    const { error } = publisherValidation(req.body);
    if(error) return next(new ErrorResponse(error.details[0].message, 400));
    // Check if Data is Exits
    const nameExists = await Publisher.findOne({name});
    const emailExists = await Publisher.findOne({email});
    if(nameExists || emailExists) return next(new ErrorResponse(`Data Is Exists`, 204));
    // Create New Object
    const newPublisher = Publisher(req.body);
    try {
        const saved = await newPublisher.save();
        if(!saved) return next(new ErrorResponse("Value Not Add", 400));
        
        res.status(201).json({success: true, message: "Added Successfully"});

    } catch (error) {
        next(error);
    }
}

exports.deletePublisher = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}

exports.updatePublisher = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}