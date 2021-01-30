const db = require('./db.config');

const Books = (book) => {
    this.isbn = book.isbn;
    this.name = book.name;
    this.author = book.author;
    this.cat = book.cat;
    this.lang = book.cat;
    this.edition = book.edition;
    this.volume = book.volume;
    this.unit = book.unit;
    this.price = book.price;
};

Books.GET_ALL_BOOKS = (result) => {
    sql.query("Select * from book", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('book : ', res);

            result(null, res);
        }
    });
};