const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    type:{
        type:String,
        enum:["room","tiffin"],
        required:true,
    },
    name: {
        type: String,
        required: true,
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
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
    contact: {
        type: Number,
        required: true,
    },
    feature: [{
        type: String,
    }],
    price:{
        type:Number,
        required:true,
    }
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
