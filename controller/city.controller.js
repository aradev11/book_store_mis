const City = require("../models/city.model");

// Import City Validation 
const { cityValidation } = require("../security/validation");

// Get all data from database
exports.allCity = async (req, res) => {
    const { dtl } = req.query;
    let allCity = "";
    try {
        if(dtl == "show") allCity = await City.find().populate('country'); 
        else allCity = await City.find();

        res.status(201).send(allCity);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Get single data from database
exports.singleCity = async (req, res) => {
    const { dtl } = req.query;
    const { id } = req.params;
    let singleCity = "";
    try {
        if(dtl === "show") singleCity = await City.findById(id).populate('country'); 
        else singleCity = await City.findById(id);

        if(!singleCity) return res.status(400).send(`Not City with id of: ${id}`);

        res.status(201).send(singleCity);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Post data to database
exports.addCity = async (req, res) => {
    //check if validate 
    const { error } = cityValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    // Check if dublicate
    const { name } = req.body;
    const CityExists = await City.findOne({ name });
    if(CityExists) return res.status(400).send(`${req.body.name} is Already Exists`);

    // Creating Schema for new value
    const newCity = new City(req.body)

    try {
        const savedCity = await newCity.save();
        res.status(201).send(savedCity);
    } catch {
        res.status(400).json(err);
    }
}

// Delete data from database 
exports.deleteCity = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json(err);
    }
}

// Update data from database 
exports.editCity = async (req, res) => {
    try {

    } catch(err) {
        res.status(400).json(err);
    }
}
