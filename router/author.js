const router = require('express').Router();
const verfied = require('./verifyToken');
const {
    allAuthor,
    singleAuthor,
    postAuthor,
    deleteAuthor,
    updateAuthor
} = require("../controller/author.controller");


router.get("/", allAuthor);
router.get("/:id", singleAuthor);
router.post("/", verfied, postAuthor);
router.delete("/:id", verfied, deleteAuthor);
router.put("/:id", verfied, updateAuthor)


module.exports = router;