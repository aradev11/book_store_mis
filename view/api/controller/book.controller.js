
var Books = require('../models/book.model');

exports.list_all_books = function (req, res) {
    Books.GET_ALL_BOOKS(function (err, book) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', book);
        res.send(book);
    });
};