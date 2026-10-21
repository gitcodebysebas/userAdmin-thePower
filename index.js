require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const postsRouter = require("./src/api/routes/post");
const usersRouter = require("./src/api/routes/user");

const app = express();

app.use(express.json());

app.use("/api/v1/posts", postsRouter);

connectDB();

app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/users/login", usersRouter);

app.use("", (req, res, next) => {
    return res.status(404).json("Ruta no encontrada");
});

app.listen(3000, () => {
    console.log("Servidor levantado en: http://localhost:3000");
});