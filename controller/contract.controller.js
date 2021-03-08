const Contract = require('../models/contract.model');
const Employee = require('../models/employee.model');

// Error Handler
const ErrorResponse = require('../utils/send.email');

// Validation Form
const { contractValidation } = require('../security/validation');

// Get All Contracts
exports.allContract = async (req, res, next) => {
    const { dtl } = req.query;
    let data = '';
    try {
        if (dtl == "show") data = await Contract
            .find()
            .populate('employee_id')
            .populate('sallay.unit')
        else data = await Contract.find();

        // if there is no value
        if (data.length === 0)
            return next(new ErrorResponse("No Value", 204));

        res.status(201).json({ sucess: true, data });

    } catch (error) {
        next(error);
    }
}

// Get Single Value form Database
exports.getSingleContract = async (req, res, next) => {
    const { dtl } = req.query;
    const { id } = req.params;
    let data = '';
    try {
        if (dtl == "show") data = await Contract
            .find()
            .populate('employee_id')
            .populate('sallay.unit')
        else data = await Contract.find();

        // if there is no value
        if (data.length === 0)
            return next(new ErrorResponse("No Value", 204));

        res.status(201).json({ sucess: true, data });

    } catch (error) {
        next(error);
    }
}

// allContract,
// getSingleContract,
// addContract,
// deleteContract,
// editContract


// ADD NEW CONTRACT
exports.addContract = async (req, res, next) => {

}

// Delete Contract
exports.deleteContract = async (req, res, next) => {

}

// Edit Contract
exports.editContract = async (req, res, next) => {

}