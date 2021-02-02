const Country = require("../models/country.model");
const City = require("../models/city.model");

// Import City Validation 
const { countryValidation, cityValidation } = require("../security/validation");

// Get all data from database
exports.allCountry = async (req, res) => {
    const { dtl } = req.query;
    try {
        if(dtl == "show") allCountry = await Country.find().populate('cities'); 
        else allCountry = await Country.find();

        res.status(201).send(allCountry);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Get single data from database
exports.singleCountry = async (req, res) => {
    const { dtl } = req.query;
    const { id } = req.params;
    let singleCountry = "";
    try {
        if(dtl === "show") singleCountry = await Country.findById(id).populate('cities');
        else singleCountry = await Country.findById(id);

        if(!singleCountry) return res.status(400).send("No Country");

        console.log(req.query)
        res.status(200).send(singleCountry);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Post data to database
exports.addCountry = async (req, res) => {
    //check if validate 
    const { error } = countryValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    // Check if dublicate
    const countryExists = await Country.findOne({ name: req.body.name });
    if(countryExists) return res.status(400).send("Country Duplicated");

    // Creating Schema for new value
    const newCountry = new Country(req.body)

    try {
        const savedCountry = await newCountry.save();
        res.status(201).send(savedCountry);
    } catch {
        res.status(400).json(err);
    }
}

// Delete data from database 
exports.deleteCountry = async (req, res) => {
    try {
        const { id }  = req.params;
        const deleteCountry = await Country.remove({_id: id});
        const deleteRelativeCity = await City.remove({country: id});
        if(!deleteRelativeCity || !deleteCountry) return res.status(401).send(`Country With id of: ${id} Not Delete`);

        res.status(200).send(`Country with id of: ${id} delete Successfully`);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Update data from database 
exports.editCountry = async (req, res) => {
    // Check if Country Value is Correct
    const { error } = countryValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try {
        const { id } = req.params; 
        const updateResult = await Country.findByIdAndUpdate(id, req.body);
        if(!updateResult) return res.status(400).send("Country Not Update");

        res.status(201).send("Successfully Updated");
    } catch(err) {
        res.status(400).json(err);
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
