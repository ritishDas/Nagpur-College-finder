const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favcoll: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
    }],
    favser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
    }],
    service: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
    }],
});


userSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRY } 
    );
    return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
