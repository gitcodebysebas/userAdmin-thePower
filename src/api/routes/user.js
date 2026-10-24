const { register, login, getUsers } = require("../controllers/user");
const { isAuth } = require("../../middlewares/isAuth");
const usersRouter = require("express").Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/", isAuth, getUsers);

module.exports = usersRouter;