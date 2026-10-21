const { getPosts, postPosts, updatePosts, deletePosts } = require("../controllers/postController");

const postsRouter = require("express").Router();

postsRouter.get("/", getPosts);
postsRouter.post("/", postPosts);
postsRouter.put("/:id", updatePosts);
postsRouter.delete("/:id", deletePosts);

module.exports = postsRouter;