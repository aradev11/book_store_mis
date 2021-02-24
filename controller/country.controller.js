const Country = require("../models/country.model");
const City = require("../models/city.model");

// Import City Validation 
const { countryValidation, cityValidation } = require("../security/validation");

const ErrorResponse = require('../utils/error.response');

// Get all data from database
exports.allCountry = async (req, res, next) => {
    const { dtl } = req.query;
    try {
        if(dtl == "show") data = await Country.find().populate('cities'); 
        else data = await Country.find();
        if(data.length === 0) return next(new ErrorResponse("No Value", 400));
        res.status(200).json({success: true, data});

    } catch (err) {
        next(err);
    }
}

// Get single data from database
exports.singleCountry = async (req, res, next) => {
    const { dtl } = req.query;
    const { id } = req.params;
    let data = "";
    try {
        if(dtl === "show") data = await Country.findById(id).populate('cities');
        else data = await Country.findById(id);
        if(data.length === 0) return next(new ErrorResponse("No Value", 400));

        res.status(200).json({ success: true, data});
    } catch (err) {
        next(err);
    }
}

// Post data to database
exports.addCountry = async (req, res, next) => {
    const { name } = req.body;
    //check if validate 
    const { error } = countryValidation(req.body)
    if(error) return next(new ErrorResponse(error.details[0].message, 400));
    // Check if dublicate
    const countryExists = await Country.findOne({ name });
    if(countryExists) return next(new ErrorResponse("Country Duplicated", 204));

    // Creating Schema for new value
    const newCountry = new Country(req.body)

    try {
        const saved = await newCountry.save();
        if(!saved) return next(new ErrorResponse("Value Not Saved", 400));

        res.status(201).json({success: true, message: "Add Successfully"});
    } catch {
        next(err);
    }
}

// Delete data from database 
exports.deleteCountry = async (req, res, next) => {
    const { id }  = req.params;
    try {
        const deleteCountry = await Country.remove({_id: id});
        const deleteRelativeCity = await City.remove({country: id});
        if(!deleteRelativeCity || !deleteCountry) return next(new ErrorResponse(`Value did Not Delete`, 401) );

        res.status(200).send(`Value Delete Successfully`);
    } catch (err) {
        next(err);
    }
}

// Update data from database 
exports.editCountry = async (req, res, next) => {
    const { id } = req.params; 
    // Check if Country Value is Correct
    const { error } = countryValidation(req.body);
    if(error) return next(new ErrorResponse(error.details[0].message, 400));

    try {
        const updateResult = await Country.findByIdAndUpdate(id, req.body);
        if(!updateResult) return next(new ErrorResponse("Value Did Not Update", 400) );

        res.status(201).json({success: true, message: "Successfully Updated"});
    } catch(err) {
        next(err);
    }
}


// Post new city with country id and push city id to Country "cities" array
exports.addNewCityByCountry = async (req, res) => {
    //check if validate 
    const { error } = cityValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    // Check if dublicate
    const { id } = req.params;
    const { name } = req.body;

    const CityExists = await City.findOne({ 
        name,
        country: id
     });
    if(CityExists) return res.status(400).send(`${name} is Already Exists`);

    // Get the Coutnry
    const country = await Country.findById(id);
    // Create New City
    const newCity = new City(req.body);

    try {
        // Assign City id as Country.city
        newCity.country = country;
        // Save new City
        await newCity.save();
        // Add city to country array name of "cities"
        country.cities.push(newCity);
        // Save the Country city
        await country.save();

        res.status(201).send("Successfully Added");
    } catch (err) {
        res.status(400).json(err);
    }
}
