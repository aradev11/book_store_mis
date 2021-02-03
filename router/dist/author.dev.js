"use strict";

var router = require('express').Router();

var verfied = require('../middleware/protect');

var _require = require("../controller/author.controller"),
    allAuthor = _require.allAuthor,
    singleAuthor = _require.singleAuthor,
    postAuthor = _require.postAuthor,
    deleteAuthor = _require.deleteAuthor,
    updateAuthor = _require.updateAuthor;

router.get("/", allAuthor);
router.get("/:id", singleAuthor);
router.post("/", verfied, postAuthor);
router["delete"]("/:id", verfied, deleteAuthor);
router.put("/:id", verfied, updateAuthor);
module.exports = router;