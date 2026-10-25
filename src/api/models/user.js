const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email: { type: String, require: true },
        password: { type: String, require: true },
        userName: { type: String, require: true },
        userImg: { type: String, require: true },
        role: { type: String, enum: ["user", "admin"], default: "user" }
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10);
})

const User = mongoose.model("users", userSchema, "users");
module.exports = User;