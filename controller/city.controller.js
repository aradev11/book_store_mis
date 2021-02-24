const City = require("../models/city.model");
const Country = require("../models/country.model");

// Import City Validation 
const { cityValidation } = require("../security/validation");

const ErroResponse = require('../utils/error.response');

// Get all data from database
exports.allCity = async (req, res, next) => {
    const { dtl } = req.query;
    let data = "";
    try {
        if(dtl == "show") data = await City.find().populate('country'); 
        else data = await City.find();
        if(data.length === 0) return next(new ErroResponse("No Value", 400));

        res.status(201).json({ success: true, data });
    } catch (err) {
        next(err);
    }
}

// Get single data from database
exports.singleCity = async (req, res, next) => {
    const { dtl } = req.query;
    const { id } = req.params;
    let data = "";
    try {
        if(dtl === "show") data = await City.findById(id).populate('country'); 
        else data = await City.findById(id);

        if(data.length === 0) return next(new ErroResponse("No Value", 400));

        res.status(200).json({success: true, data});
    } catch (err) {
        next(err);
    }
}

// Post data to database
exports.addCity = async (req, res, next) => {
    const { name, country } = req.body;
    //check if validate 
    const { error } = cityValidation(req.body)
    if(error) return next(new ErroResponse(error.details[0].message, 400));
    // Check if dublicate
    const CityExists = await City.findOne({ name });
    if(CityExists) return next(new ErroResponse("Value Duplicated", 204));

    // Found Country With Id
    const foundCountry = await Country.findById(country);

    // Creating Schema for new value
    const newCity = new City(req.body)

    try {
        foundCountry.cities.push(newCity);
        await foundCountry.save();
        const saved = await newCity.save();
        if(!saved) return next(new ErroResponse("Value Didnot Add", 400));

        res.status(201).json({success: true, message: "Value Add Successfully"});
    } catch {
        next(err);
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
