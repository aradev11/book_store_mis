const Author = require("../models/author.model");

// Import Author Validation
const { authorValidation } = require("../security/validation");

// Get all data from database
exports.allAuthor = async (req, res) => {
    try {
        const allAuthor = await Author.find();
        res.status(201).send(allAuthor);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Get single Value from database
exports.singleAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        res.status(201).send(author);
    } catch(err) {
        res.status(400).json(err);
    }
}

// Post data to database
exports.postAuthor = async (req, res) => {
    // Check if post invalid
    const { error } = authorValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Check if post is already Exists
    const authorExists = await Author.findOne({
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });
    if(authorExists) return res.status(400).send("Author Is Already Exists");

    const newAuthor = new Author({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        img: req.body.img,
        about: req.body.about,
        email: req.body.email,
        website: req.body.website
    });
    try {
        const savedAuthor = await newAuthor.save();
        res.status(201).send(savedAuthor);
    } catch (err) {
        res.status(400).json(err);
    }
}

// delete Author from database
exports.deleteAuthor = async (req, res) => {
    try {
        const deleteAuthor = await Author.remove({_id: req.params.id});
        if(!deleteAuthor) return res.status(401).send(`Can't Delete Author with id of: ${req.params.id}`);

        res.status(200).send(`Author with id of ${req.params.id} Delete Successfully`);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Update Author From databse
exports.updateAuthor = async (req, res) => {
    // Check if post invalid
    const { error } = authorValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try {
        const updateResult = await Author.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(updateResult);
    } catch (err) {
        res.status(500).json(err);
    }
}