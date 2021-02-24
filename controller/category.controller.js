// Importing Model
const Category = require("../models/category.model");
// Model Validation
const { categoryValidation } = require("../security/validation");
// Error 
const ErrorResponse = require("../utils/error.response");

// Routes
// get all data from database
exports.getAllCat = async (req, res, next) => {
    try {
        const categories = await Category.find();
        if(categories.length === 0) return next(new ErrorResponse("No Value", 204));
        // response the data
        res.status(200).json({success: true, data: categories});
    } catch (error) {
        next(error);
    }
}
// get all data from database by single id
exports.getSingleCat = async (req, res, next) => {
    const { id } = req.params;
    try {
        const single = await Category.findById(id);
        if(single === 0) return next(new ErrorResponse("No Value", 204));
        // response the data
        res.status(200).json({success: true, data: single});
    } catch (error) {
        next(error);
    }
}
// post new category to database 
exports.addCat = async (req, res, next) => {
    const { title } = req.body;
    // check if data is not valid
    const { error } = categoryValidation(req.body);
    if(error) return next(new ErrorResponse(error.details[0].message), 400);
    // check if data is Duplicated
    const catExists = await Category.findOne({ title });
    if(catExists) return next(new ErrorResponse(`${title}  is already Exists`, 400)); 

    const newCat = new Category(req.body)
    try {
        const saved = await newCat.save();
        if(!saved) return next(new ErrorResponse("Data Not Add", 400));

        res.status(201).json({success: true, message: "Add Successfully"});
    } catch (error) {
        next(error);
    }
}
// delete a category from database
exports.deleteCat = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}
// update a category from database
exports.updateCat = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}
