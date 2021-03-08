const Customer = require("../models/customer.model");

// import validation
const { customerValidation } = require('../security/validation');

const ErrorResponse = require('../utils/error.response');

//Get all data from database
exports.allCustomer = async (req, res, next) => {
    const { dtl } = req.query;
    let data = "";
    try {
        if (dtl == "show") data =
            await Customer.find()
                .populate('addresses.city')
                .populate('addresses.country');
        else data = await Customer.find();
        // if there is no value to response 
        if (data.length === 0) next(new ErrorResponse("No value", 204))

        res.status(201).json({ success: true, data });
    } catch (err) {
        next(err);
    }
}

// Get Single data from database 
exports.singleCustomer = async (req, res, next) => {
    const { dtl } = req.query;
    const { id } = req.params;
    let data = "";
    try {
        if (dtl === "show") data = await Customer
            .findById(id)
            .populate('addresses.country')
            .populate('addresses.city');
        else data = await Customer.findById(id);
        if (data.length === 0) return next(new ErrorResponse("No Value", 204));

        res.status(201).json({ success: true, data });
    } catch (err) {
        next(err);
    }
}

// Add data to database 
exports.addCustomer = async (req, res, next) => {
    const { c_id } = req.body;
    // Check Validation 
    const { error } = customerValidation(res.body);
    if (error) return next(new ErrorResponse(error.details[0].message, 400));
    // Check if Customer is alreay exists
    const customerExists = await Customer.findOne({ c_id });
    if (customerExists) next(new ErrorResponse("Data Already Exists", 400));

    const newCustomer = new Customer(req.body);
    try {
        const saved = await newCustomer.save();
        // if not Saved
        if (!saved) return next(new ErrorResponse("Customer Not Add", 400));

        res.status(201).json({ success: true, message: "Add Successfully" });
    } catch (err) {
        next(err);
    }
}

// delete Customer from database
exports.deleteCustomer = async (req, res, next) => {
    const { id } = req.body;
    try {
        const deletedCustomer = await Customer.remove({ _id: id });
        if (!deletedCustomer) return next(new ErrorResponse("Value Not Delete", 400));

        res.status(200).json({ success: true, message: "Value deleted Scuesscfully" });
    } catch (err) {
        next(err);
    }
}

// Udate Customer from datadat with id
exports.editCustomer = async (req, res, next) => {
    // Check Validation 
    const { error } = customerValidation(res.body);
    if (error) return next(new ErrorResponse(error.details[0].message, 400));
    try {
        const updateResult = await Customer.findByIdAndUpdate(id, req.body);
        if (!updateResult) return next(new ErrorResponse("Value Not Updated", 400));

        res.status(200).json({ success: true, message: "Updated Successfully" });
    } catch (err) {
        next(err);
    }
}