const router = require('express').Router();
const verfied = require('./verifyToken');

const {
    getAllBook,
    getSingleBook,
    addBook,
    deleteBook,
    updateBook
} = require('../controller/book.controller');

// Router Verfication
// GET ALL BOOKS TO DATABASE
router.get("/", getAllBook);
// POST ALL VALUE TO DATABASE
router.post("/", verfied, addBook);
// GET ALL BOOK IF BOOK EXISTS WITH ID
router.get('/:id', getSingleBook);
// DELETE THE BOOK
router.delete('/:id', verfied, deleteBook);
// DELETE THE BOOK
router.put('/:id', verfied, updateBook);


module.exports = router;
