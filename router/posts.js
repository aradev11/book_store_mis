const router = require('express').Router();
const verfied = require('./verifyToken');
const { 
    allPosts,
    addPost,
    singlePost,
    deletePost,
    updatePost    
} = require("../controller/post.controller");

router.get("/", allPosts);
router.post("/", verfied, addPost);
router.get("/:id", verfied, singlePost);
router.delete("/:id", verfied, deletePost);
router.put("/:id", verfied, updatePost);

module.exports = router;