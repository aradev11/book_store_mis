"use strict";

var router = require('express').Router();

var verfied = require('../middleware/protect');

var _require = require('../controller/book.controller'),
    getAllBook = _require.getAllBook,
    getSingleBook = _require.getSingleBook,
    addBook = _require.addBook,
    deleteBook = _require.deleteBook,
    updateBook = _require.updateBook; // Router Verfication
// GET ALL BOOKS TO DATABASE


router.get("/", getAllBook); // POST ALL VALUE TO DATABASE

router.post("/", verfied, addBook); // GET ALL BOOK IF BOOK EXISTS WITH ID

router.get('/:id', getSingleBook); // DELETE THE BOOK

router["delete"]('/:id', verfied, deleteBook); // DELETE THE BOOK

router.put('/:id', verfied, updateBook);
module.exports = router;