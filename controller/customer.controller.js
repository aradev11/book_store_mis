const Customer = require("../models/customer.model");

// import validation
const { customerValidation } = require('../security/validation');


//Get all data from database
exports.allCustomer = async (req, res) => {
    const { dtl } = req.query;
    let allCustomer = "";
    try {
        if(dtl == "show") allCustomer = 
        await Customer.find()
        .populate('addresses.city')
        .populate('addresses.country');
        else allCustomer = await Customer.find();
        if(!allCustomer) return res.status(404).send("Not Found");

        res.status(201).send(allCustomer);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Get Single data from database 
exports.singleCustomer = async (req, res) => {
    const { dtl } = req.query;
    const { id } = req.params;
    let singleCustomer = "";
    try {
        if(dtl === "show") singleCustomer = await Customer
        .findById(id)
        .populate('addresses.country')
        .populate('addresses.city');
        else singleCustomer = await Customer.findById(id);
        if(!singleCustomer) return res.status(404).send("NOT FOUND");

        res.status(201).send(singleCustomer);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Add data to database 
exports.addCustomer = async (req, res) => {
    // Check Validation 
    const { error } = customerValidation(res.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Check if Exists
    const {
        id_card,
        first_name,
        last_name
    } = req.body;
    const customerExists = await Customer.findOne({ 
        id_card,
        first_name,
        last_name
    });
    if(customerExists) return res.status(400).send("Customer Already Exists");

    const newCustomer = new Customer(req.body);
    try {

        const savedCustomer = await newCustomer.save();
        if(!savedCustomer) return req.status(400).send("Customer Not Add");

        res.status(201).send(savedCustomer);
    } catch (err) {
        res.status(400).json(err);
    }
}

// delete Customer from database
exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.remove({_id: req.params.id});
        if(!deletedCustomer) return res.status(400).send("Can't delet this Customer");

        res.status(200).send(`Customer with id of: ${res.params.id} Delete Successfully`);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Udate Customer from datadat with id
exports.editCustomer = async (req, res) => {
    // Check Validation 
    const { error } = customerValidation(res.body);
    if(error) return res.status(400).send(error.details[0].message);
    try {
        const updateResult = await Customer.findByIdAndUpdate(req.params.id, req.body);
        if(!updateResult) return res.status(400).send("Not Updated");

        res.status(200).send("Updated Successfully");
    } catch (err) {
        res.status(500).json(err);
    }
}