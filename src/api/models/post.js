const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { type: String, required: true },
    img: { type: String, required: true },
    comment: { type: String, required: true }
}, { 
    timestamps: true 
});

const Post = mongoose.model("posts", postSchema, "posts");
module.exports = Post;