const { getPosts, postPosts, updatePosts, deletePosts } = require("../controllers/post");

const postsRouter = require("express").Router();

postsRouter.get("/", getPosts);
postsRouter.post("/", postPosts);cl
postsRouter.put("/:id", updatePosts);
postsRouter.delete("/:id", deletePosts);

module.exports = postsRouter;