const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    photo: [{
        type: String,
    }],
    location: {
        type: String,
        required: true,
    },
    llink: {
        type: String,
        required: true,
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    website: {
        type: String,
        required: true,
    },
    feature: [{
        type: String,
    }],
});

const College = mongoose.model("College", collegeSchema);

module.exports = College;
