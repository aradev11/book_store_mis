const router = require('express').Router();
const verfied = require('../middleware/protect');
const { 
    allPosts,
    addPost,
    singlePost,
    deletePost,
    updatePost    
} = require("../controller/post.controller");

router.get("/", allPosts);
router.post("/", verfied, addPost);
router.get("/:id", singlePost);
router.delete("/:id", verfied, deletePost);
router.put("/:id", verfied, updatePost);

module.exports = router;