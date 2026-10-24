const upload = require("../../middlewares/file");
const { getPosts, postPosts, updatePosts, deletePosts } = require("../controllers/post");

const postsRouter = require("express").Router();

postsRouter.get("/", getPosts);
postsRouter.post("/", upload.single("img"), postPosts);
postsRouter.put("/:id", updatePosts);
postsRouter.delete("/:id", deletePosts);

module.exports = postsRouter;