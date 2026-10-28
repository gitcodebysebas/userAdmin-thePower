const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique:true, lowercase:true, trim:true },
        password: { type: String, required: true },
        userName: { type: String, required: true },
        userImg: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }]
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