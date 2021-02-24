const Transilator = require("../models/transilator.model");

//Import Transilator Validation
const { transilatorValidation } = require("../security/validation");

// ERROR
const ErrorResponse = require('../utils/error.response');

// Get all data from database
exports.allTransilator = async (req, res, next) => {
    try {
        const data = await Transilator.find();
        if(data.length === 0) return next(new ErrorResponse("No Value", 400));

        res.status(201).json({success: true, data});
    } catch (err) {
        next(err);
    }
}

// Get all data by id from database 
exports.singleTransilator = async (req, res, next) => {
    const {id} = req.params;
    try {
        const data = await Transilator.findById(id);
        if(data.length === 0) return next(new ErrorResponse("No Value", 400));

        res.status(201).json({success: true, data});
    } catch (err) {
        next(err);
    }
}

// Post single Data to database
exports.addTransilator = async (req, res, next) => {
    const { first_name, last_name } = req.body;
    // Check validation
    const { error } = transilatorValidation(req.body);
    if(error) return next(new ErrorResponse(error.details[0].message, 400) );
    // Check if Exists
    const transilatorExists = await Transilator.findOne({ first_name, last_name });
    if(transilatorExists) return next(new ErrorResponse("Value Already Exists", 204));

    const newTransilator = new Transilator(req.body);
    try {
        const saved = await newTransilator.save();
        if(!saved) return next(new ErrorResponse("Value Not Add", 400));

        res.status(201).json({success: true, message: "Add Successfully"});
    } catch (err) {  
        next(err);
    }
}

// delete Transilator form database
exports.deleteTransilator = async (req, res) => {
    try {   
        const deletedTransilator = Transilator.remove({_id: req.params.id});
        if(!deletedTransilator) return res.status(401).send(`Transilator with id of: ${req.params.id} Not Delete`);
        
        res.status(200).send(`Transilator with id of: ${req.params.id} Delte Successfully`);
    } catch (err) {
        res.status(400).json(err);
    }
}

// update Transilator from database 
exports.editTransilator = async (req, res) => {
    // Check validation
    const { error } = transilatorValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        const updateResult = await Transilator.findByIdAndUpdate(req.params.id, req.body);
        if(!updateResult) return res.status(400).send("Not Updated")
        
        res.status(200).json(updateResult);
    } catch (err) { 
        res.status(500).json(err);
    }
}