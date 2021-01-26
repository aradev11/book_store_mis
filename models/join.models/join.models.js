const mongoose = require('mongoose');

// JOIN THE TABLE OF BOOK WITH BOOK DETAIL 
const joinBookWithBookDetail = mongoose.aggregate({
    $lookup: {
        from: "books",
        localField: "isbn",
        foreignField: "bookDetail",
        as: "isbn"
    }
});

module.exports = mongoose.model('JoinBookWithBookDetail', joinBookWithBookDetail);