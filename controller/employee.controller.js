const Employee = require('../models/employee.model');
const User = require("../models/user.model");

// IMPORT VALIDATIONS 
const { employeeValidation, regUserValidation } = require('../security/validation');

// Get All Employess From databse 
exports.allEmployee = async (req, res) => {
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

        if(allEmployees.length === 0) return res.status(400).send("NO VALUE");

        res.status(201).send(allEmployees);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Get Single Employee from database
exports.singleEmployee = async (req, res) => {
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
        else singleValue = await Employee.find(id);

        if(singleValue.length == 0) return res.status(400).send("NO VALUE");

        res.status(201).send(singleValue);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Add Employee to Database 
exports.addEmployee = async (req, res) => {
    // Check if Data is Validate
    const { error } = employeeValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Check if Data is Duplicated
    const employeeExists = await Employee.findOne({
        id_card: req.body.id_card,
        first_name: req.body.first_name,
        email: req.body.email
    });
    if(employeeExists) return res.status(400).send("Value Duplicated");

    const newEmployee = new Employee(req.body);
    try {
        const savedEmployee = await newEmployee.save();
        if(!savedEmployee) return res.status(400).send("Entery Faild");

        res.status(201).send("Add SuccessFully");
    } catch (err) {
        res.status(400).json(err);
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
exports.deleteEmployee = async (req, res) => {

}

// Edit Employee 
exports.editEmployee = async (req, res) => {

}