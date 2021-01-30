const Transilator = require("../models/transilator.model");

//Import Transilator Validation
const { transilatorValidation } = require("../security/validation");

// Get all data from database
exports.allTransilator = async (req, res) => {
    try {
        const allTransilator = await Transilator.find();
        if(!allTransilator) return res.status(404).send("Not Found");

        res.status(201).send(allTransilator);
    } catch (err) {
        res.send(400).json(err);
    }
}

// Get all data by id from database 
exports.singleTransilator = async (req, res) => {
    try {
        const singleTransilator = await Transilator.findById(req.params.id);
        res.status(201).send(singleTransilator);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Post single Data to database
exports.addTransilator = async (req, res) => {
    // Check validation
    const { error } = transilatorValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Check if Exists
    const transilatorExists = await Transilator.findOne({
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });
    if(transilatorExists) return res.status(400).send("Post Already Exists");

    const newTransilator = new Transilator({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        img: req.body.img,
        about: req.body.about,
        email: req.body.email,
        website: req.body.website
    });
    try {
        const savedTransilator = await newTransilator.save();
        res.status(201).send(savedTransilator);
    } catch (err) {  
        res.status(400).json(err);
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