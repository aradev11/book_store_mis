const router = require('express').Router();
const verfied = require('./verifyToken');

const {
    getAllBook,
    getSingleBook,
    addBook,
    deleteBook,
    updateBook,
    getBookDetails
} = require('../controller/book.controller');

// Router Verfication
// GET ALL BOOKS TO DATABASE
router.get("/", verfied, getAllBook);
// POST ALL VALUE TO DATABASE
router.post("/", verfied, addBook);
// GET ALL BOOK IF BOOK EXISTS WITH ID
router.get('/:id', verfied, getSingleBook);
// DELETE THE BOOK
router.delete('/:id', verfied, deleteBook);
// DELETE THE BOOK
router.put('/:id', verfied, updateBook);
// GET BOOK DETAILS WITH ID OF BOOK VALUE
router.get("/book_detail/:detail_id", verfied, getBookDetails);

module.exports = router;
