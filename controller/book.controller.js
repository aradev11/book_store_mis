const Book = require("../models/book.model");

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
        const singBook = await Book.findById(req.params.id);
        if(!singBook) return res.status(400).send("There is No book");
        // send respone as single post
        res.send(singBook);
    } catch (err) {
        res.sendStatus(400).json();
    }
};

// POST DATA TO DATABASE
exports.addBook = async (req, res) => {
    // CHECK IF POST IS INVALID
    const { error } = bookValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // CHECK IF BOOK IS ALREADY EXISTS 
    const bookExists = await Book.findOne({
        name: res.body.name,
        edition: res.body.edition
    });
    if(bookExists) return res.status(400).send(`There is a book with name of ${res.body.name} and edition of ${res.body.edition}`);
    
    const newBook = new Book({
            isbn: req.body.isbn,
            name: req.body.name,
            author: {
                aut_id: req.body.author.aut_id,
                aut_name: req.body.author.aut_name,
                aut_lname: req.body.author.aut_lname
            },
            cat: {
                cat_id: req.body.cat.cat_id,
                cat_name: req.body.cat.cat_name
            },
            lang: {
                lang_id: req.body.lang.lang_id,
                lang_name: req.body.lang.lang_name
            },
            edition: req.body.edition,
            volume: req.body.volume,
            wrapper: req.body.wrapper,
            unit: {
                unit_id: req.body.unit.unit_id,
                unit_type: req.body.unit.unit_type
            },
            price: req.body.price,
            details: {
                view: req.body.details.view,
                content: req.body.details.content,
                transilator: {
                    trans_id: req.body.details.transilator.trans_id,
                    trans_name: req.body.details.transilator.trans_name,
                    trans_lname: req.body.details.transilator.trans_lname
                },
                shelf: req.body.details.shelf,
                publisher: {
                    pub_id: req.body.details.publisher.pub_id,
                    pub_name: req.body.details.publisher.pub_name
                },
                pdf: req.body.details.pdf,
                img: req.body.details.img,
            }
    });
    try {
        const savedBook = await newBook.save();
        res.status(201).send(savedBook);
    } catch (err) {
        res.status(400).json(err);
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

