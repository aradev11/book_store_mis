const Book = require("../models/book.model");
const BookDetails = require('../models/bookDetail.model');

//IMPORT BOOK VALIDATION BEFORE DATA SEND TO DATABASE 
const { bookValidation } = require('../security/validation');

//GET THE ALL BOOKS
exports.getAllBook = async (req, res) => {
    try {
        const allBook = await Book.find();
        res.send(allBook);
    } catch (err) {
        res.sendStatus(400).json(err);
    }
};

// GET THE SINGLE DATA BY ID
exports.getSingleBook = async (req, res) => {
    try {
        const singBook = await Book.findByID(req.params.id);
        // send respone as single post
        res.send(singBook);
    } catch (err) {
        res.sendStatus(400).json();
    }
};

// POST DATA TO DATABASE
exports.addBook = async (req, res) => {
    try {
        // CHECK IF POST IS INVALID
        const { error } = bookValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        // CHECK IF BOOK IS ALREADY EXISTS 
        const bookExists = await Book.findOne({
            name: res.body.name,
            edition: res.body.edition
        });
        if(bookExists) return res.sendStatus(400).send(`There is a book with name of ${res.body.name} and edition of ${res.body.edition}`);

        const newBook = new Book({
            isbn: req.body.isbn,
            name: req.body.name,
            author: req.body.author,
            cat: req.body.cat,
            lang: req.body.lang,
            edition: req.body.edition,
            volume: req.body.edition,
            wrapper: req.body.wrapper,
            unit: req.body.unit,
            price: req.body.price
        });

        const savedBook = await newBook.save();
        res.send(201).json(savedBook);
    } catch (err) {
        res.sendStatus(400).json(err);
    }
};

// EDIT EACH BOOK BY ID OF ANY POST
exports.updateBook = async (req, res) => {
    try {
        const updateResult = await Book.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(updateResult);
        res.send(updateResult);
    } catch(err) {
        res.sendStatus(400).json(err);
    }
};

// DELETE BOOK WITH ID BY ID
exports.deleteBook = async (req, res) => {
    try {
        const deleteBook = await Book.findByIdAndDelete(req.params.id, req.body);
        if(!deleteBook) return res.status(401).send(`DELETE PROCESS WITH ID OF ${res.params.id} IS FAILD`);

        res.status(200).send(`POST WITH ID OF ${req.params.id} IS DELETE SUCCESSFULLY`);
    } catch (err) {
        res.status(400).json(err);
    }
};

// DELETE BOOKS WITH MULTIPLE ID'S
exports.deleteMultipleBook = async (req, res) => {
    try {
        const getTheBookIds = await Book.findById(req.params.id);
        deleteMultipleBook = [...deleteMultipleBook, getTheBookIds];
        
    } catch (err) {
        res.status(400).json(err);
    }
}


exports.getBookDetails = async (req, res) => {
    try {

    } catch (err) {
        res.sendStatus(400).json(err);
    }
}