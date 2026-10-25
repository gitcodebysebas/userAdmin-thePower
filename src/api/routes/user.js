const { register, login, getUsers, changeRole, deleteUser } = require("../controllers/user");
const { isAuth } = require("../../middlewares/isAuth");
const { isAdmin } = require("../../middlewares/isAdmin");
const usersRouter = require("express").Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/", isAuth, isAdmin, getUsers);
usersRouter.put("/change-role/:id", isAuth, isAdmin, changeRole);
usersRouter.delete("/delete/:id", isAuth, isAdmin, deleteUser);

module.exports = usersRouter;