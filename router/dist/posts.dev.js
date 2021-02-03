"use strict";

var router = require('express').Router();

var verfied = require('../middleware/protect');

var _require = require("../controller/post.controller"),
    allPosts = _require.allPosts,
    addPost = _require.addPost,
    singlePost = _require.singlePost,
    deletePost = _require.deletePost,
    updatePost = _require.updatePost;

router.get("/", allPosts);
router.post("/", verfied, addPost);
router.get("/:id", singlePost);
router["delete"]("/:id", verfied, deletePost);
router.put("/:id", verfied, updatePost);
module.exports = router;