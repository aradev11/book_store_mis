const Post = require('../models/post.model');

//Import Post Validation
const { postValidation } = require('../security/validation');


// Get All date from Database
exports.allPosts =  async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.send(allPosts);
    } catch (err) {
        res.send(400).json(err);
    }
  };

// Get All date by Id
exports.singlePost = async (req, res) => {
    try {
        const singlePost = await Post.findById(req.params.id);

        res.send(singlePost);
    } catch (err) {
        res.status(400).json(err);
    }
};


// Post Data to Datebase
exports.addPost = async (req, res) => {
        try {
       // Check if Email invalid
        const { error } = postValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        // Check if Email is already Exists
        const postExists = await Post.findOne({ title: req.body.title });
        if(postExists) return res.status(400).send("Post is Already Exsits");

        const newPost = new post({
            title: req.body.title,
            text: req.body.text,
            postBy: req.user
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json(err);
    }  
};


// Edit each Post by Id of any post
exports.updatePost = async (req, res) => {
    try {
        const updateResult = await Post.findByIdAndUpdate(req.params.id, req.body); 
        res.status(200).json(updateResult);
    } catch (err) {
        res.status(500).json(err);
    }

    // if wanna use this method must to change put to patch in post-route
    // try {
    //     const updatedPost = await Post.updateOne(
    //         { _id: req.params.id },
    //         { $set: { title: req.body.title } }
    //     );  
    //     res.json(updatedPost);
    // } catch (err) {
    //     res.json({ message: err });
    // }
};

exports.deletePost = async (req, res) => {
    try {
        const deletedpost = await Post.remove({ _id: req.params.id });
        if(!deletedpost) return res.status(401).send(`There is no post with id of: ${req.params.id}`);
        
        res.status(200).send(`Post with id of: ${req.params.id}  is deleted Success fully`);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};


