const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    balance: { type: Number, default: 0 },
    income: { type: Number, default: 0 },
    expense: { type: Number, default: 0 },
    transactions: [{
        title: { type: String, required: true },
        amount: { type: Number, required: true },
        type: { type: String, required: true },
    }],
});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }
})
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

module.exports = mongoose.model("User", userSchema);