const Customer = require("../models/customer.model");

// import validation
const { customerValidation } = require('../security/validation');

//Get all data from database
exports.allCustomer = async (req, res) => {
    try {
        const allCustomer = await Customer.find();
        if(!allCustomer) return res.status(404).send("Not Found");

        res.status(201).send(allCustomer);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Get Single data from database 
exports.singleCustomer = async (req, res) => {
    try {
        const singleCustomer = await Customer.findById(req.params.id);
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
    const customerExists = await Customer.findOne({ 
        _id: req.body._id,
        id_card: req.body.id_card 
    });
    if(customerExists) return res.status(400).send("Customer Already Exists");

    const newCustomer = new Customer({
        id_card: req.body.id_card,
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        is_active: req.body.is_active,
        details: {
            street: req.body.details.street,
            street2: req.body.details.street2,
            country: {
                _id: req.body.details.country._id,
                cnt_name: req.body.details.country.cnt_name,
                cnt_code: req.body.details.country.cnt_code
            },
            city: {
                _id: req.body.details.city._id,
                city_name: req.body.details.city.city_name
            },
            email: req.body.details.email,
            phone: req.body.details.phone,
        }
    });
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