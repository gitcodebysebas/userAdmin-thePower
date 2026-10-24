const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt");

const register = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json("El usuario ya existe");
        }
        const savedUser = await user.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(400).json("error")
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json("Usuario o contraseña incorrecta");
        }

        if (bcrypt.compareSync(password, user.password)) {
            const token = generateSign(user._id);
            return res.status(200).json({ token, user });
        } else {
            return res.status(400).json("Usuario o contraseña incorrecta");
        }
    } catch (error) {
        return res.status(400).json("error");
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json("error");
    }
}

module.exports = { register, login, getUsers };