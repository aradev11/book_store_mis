// Model
const Unit = require("../models/unit.model");
// Validation
const { unitValidation } = require("../security/validation");
// Error
const ErrorResponse = require('../utils/error.response');

// Routes
// Get All Data from database
exports.getAllUnit = async (req, res, next) => {
    try {
        const data = await Unit.find();
        if(data.length === 0) return next(new ErrorResponse("No Value", 204));

        res.status(200).json({sucess: true, data});
    } catch (error) {
        next(error)
    }
}
// Get singel value from database
exports.getSingleUnit = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await Unit.findById(id);
        if(data.length === 0) return next(new ErrorResponse("No Value", 204));

        res.status(200).json({sucess: true, data})
    } catch (error) {
        next(error)
    }
}
// post value to database
exports.addUnit = async (req, res, next) => {
    const { title, symbol } = req.body;
    // Check if data is invalid
    const { error } = unitValidation(req.body);
    if(error) return next(new ErrorResponse(error.details[0].message, 400));
    // Check if Data exists
    const titleExists = await Unit.findOne({ title });
    if(titleExists) return next(new ErrorResponse(`Value with "${title}" title is already Exits`));
    const symbolExists = await Unit.findOne({symbol});
    if(symbolExists) return next(new ErrorResponse(`Value with "${symbol}" symbol is already Exits`));
    
    // Create New Object
    const newUnit = new Unit(req.body);
    
    try {
        const saved = await newUnit.save();
        if(!saved) return next(new ErrorResponse("Data Not Add", 400));

        res.status(201).json({sucess: true, message: "Add Successfully"})
    } catch (error) {
        next(error)
    }
}
// Update value from database
exports.deleteUnit = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
// Delete value from database
exports.updateUnit = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}