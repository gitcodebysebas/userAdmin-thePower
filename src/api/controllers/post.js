//! CRUD -> CREAT READ UODATE DELETE

const Post = require("../models/post");

const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(400).json("error")
    }
}

const postPosts = async (req, res, next) => {
    try {
        const newPost = new Post(req.body);
        if (req.file) {
            newPost.img = req.file.path;
        }
        const savedPost = await newPost.save();
        return res.status(201).json(savedPost);
    } catch (error) {
        return res.status(400).json("error")
    }
}

const updatePosts = async (req, res, next) => {
    try {
        const  { id } = req.params;

        const newPost = new Post(req.body);
        
        newPost._id = id;
        
        const updatedPost = await Post.findByIdAndUpdate(id, newPost, { new: true });
        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(400).json("error")
    }
}

const deletePosts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Post deleted successfully",
            element: deletedPost
        });
    } catch (error) {
        return res.status(400).json("error")
    }
}

module.exports = {
    getPosts,
    postPosts,
    updatePosts,
    deletePosts
}

// GET, POST, PUT, DELETE


