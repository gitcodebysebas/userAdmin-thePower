const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt");

// const register = async (req, res, next) => {
//     try {
//         const user = new User(req.body);

//         const existingUser = await User.findOne({ email: req.body.email });
//         if (existingUser) {
//             return res.status(400).json("El usuario ya existe");
//         }
//         const savedUser = await user.save();
//         return res.status(201).json(savedUser);
//     } catch (error) {
//         return res.status(400).json("error")
//     }
// }

const register = async (req, res, next) => {
    try {
        const { email, password, userName, userImg } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json("El usuario ya existe");
        }

        const user = new User({ email, password, userName, userImg, role: "user" });
        const savedUser = await user.save();
        savedUser.password = undefined;
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(400).json("error");
    }
};

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

const changeRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (req.user.role !== "admin") {
            return res.status(403).json("No tienes permisos para cambiar roles");
        }

        const userToUpdate = await User.findById(id);
        if (!userToUpdate) return res.status(404).json("Usuario no encontrado");

        userToUpdate.role = role;
        await userToUpdate.save();

        return res.status(200).json({ message: "Rol actualizado", user: userToUpdate });

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const requestingUser = req.user;

        // solo puede eliminar su propia cuenta o ser admin
        if (requestingUser.role !== "admin" && requestingUser._id.toString() !== id) {
            return res.status(403).json("No tienes permisos para eliminar esta cuenta");
        }

        const userToDelete = await User.findById(id);
        if (!userToDelete) return res.status(404).json("Usuario no encontrado");

        if (userToDelete.img) {
            await deleteImgCloudinary(userToDelete.img);
        }

        if (userToDelete.userImg) {
            await deleteImgCloudinary(userToDelete.userImg);
        }

        await User.findByIdAndDelete(id);
        return res.status(200).json("Usuario eliminado correctamente");

    } catch (error) {
        return res.status(500).json(error.message);
    }
};
module.exports = { register, login, getUsers, changeRole, deleteUser };