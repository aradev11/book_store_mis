const Employee = require('../models/employee.model');
const User = require("../models/user.model");
const ErrorResponse = require('../utils/error.response');

// IMPORT VALIDATIONS 
const { employeeValidation, regUserValidation } = require('../security/validation');

// Get All Employess From databse 
exports.allEmployee = async (req, res, next) => {
    const { dtl, secret } = req.query;
    let allEmployees = "";
    console.log(dtl)
    try {
        if(dtl == "show") allEmployees = await Employee
            .find()
            .populate('brand')
            .populate('contract')
            .populate('addresses.country')
            .populate('addresses.city');
        else if (dtl == "show" && secret == "admin") allEmployees = await Employee
            .find()
            .populate('auth');
        else allEmployees = await Employee.find();

        if(allEmployees.length === 0) return next(new ErrorResponse("No Value", 204));

        res.status(201).json({ success: true, data: allEmployees});
    } catch (err) {
        next(err);
    }
}

// Get Single Employee from database
exports.singleEmployee = async (req, res, next) => {
    const { dtl, secret } = req.query;
    const { id } = req.params;
    let singleValue = "";
    try {
        if(dtl === "show") singleValue = await Employee
            .find(id)
            .populate('brand')
            .populate('contract')
            .populate('addresses.country')
            .populate('addresses.city');
        else if (dtl === "show" && secret === "admin") singleValue = await Employee
            .find(id)
            .populate('auth');
        else singleValue = await Employee.findById({_id: id});

        if(singleValue.length === 0) return next(new ErrorResponse("No Value", 204));

        res.status(201).json({success: true, data: singleValue});
    } catch (err) {
        next(err);
    }
}

// Add Employee to Database 
exports.addEmployee = async (req, res, next) => {
    // Check if Data is Validate
    const { error } = employeeValidation(req.body);
    if(error) return next(new ErrorResponse(error.details[0].message, 400));
    // Check if Data is Duplicated
    const employeeExists = await Employee.findOne({id_card: req.body.id_card});
    if(employeeExists) return next(new ErrorResponse(`${req.body.id_card} Duplicated`, 400));

    const emailExists = await Employee.findOne({email: req.body.email});
    if(emailExists) return next(new ErrorResponse(`${req.body.email} Is Already Exists`));

    const newEmployee = new Employee(req.body);

    try {
        const savedEmployee = await newEmployee.save();
        if(!savedEmployee) return next(new ErrorResponse("Enter Failed", 400))

        res.status(201).json({success: true, message: "Added Successfully"});
    } catch (err) {
        next(err)
    }
}

// Add User Account for Employee
exports.addUserAccount = async (req, res) => {
    const { user_name } = req.body;
    const { id } = req.params;
    // Check if Data is Validate
    const { error } = regUserValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Check if Data Dublicated
    const accountExists = await User.findOne({ user_name });
    if(accountExists) return res.status(400).send(`${user_name} Account is Invalid`);

    // Get Employee
    const employee = await Employee.findById(id);
    // Create new Account
    const newAccount = new User(req.body);

    try {
        // Assign New Account id to Employee Table
        newAccount.auth = employee;
        // save New Account id to Employee
        await newAccount.save();
        // Add Employee Id to User Table 
        employee.emp.push(newAccount);
        // Save the Employee User
        await employee.save();

        res.status(201).send("Account Created Successfully");
    } catch {
        res.status(400).json(err);
    }
}

// Delete Employee and User Account with user id
exports.deleteEmployee = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedEmployee = await Employee.deleteOne({ _id: id }, (err, obj) => {
            if(err) throw err;
        });
        if(!deletedEmployee) return next(new ErrorResponse("Value Not Deleted", 400));

        res.status(200).send(`Employee with id of: ${res.params.id} Delete Successfully`);
    } catch (err) {
        next(err);
    }
}

// Edit Employee 
exports.editEmployee = async (req, res) => {

}