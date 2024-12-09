const College = require("../models/college.js");
const Comment = require("../models/comment.js");
const Service=require("../models/service.js");


const addCComment = async (req, res, next) => {
    const comment = req.body;
    try {
        // Create a new comment
        const tar = await Comment.create({
            by: comment.user,
            content: comment.content,
            rating: comment.rating,
        });

        console.log(tar);

        // Use College.id for update instead of _id
        await College.findOneAndUpdate(
            { id: req.params.id }, // Find the College by its `id` field
            { $push: { comments: tar._id } }, // Push the new comment ID to the comments array
            { new: true } // Option to return the updated document
        );

        console.log('Updated College with new comment');

        // Respond with the newly created comment
        res.json(tar);
    } catch (err) {
        next(err);
    }
};

const addSComment = async (req, res, next) => {
    const comment = req.body;
    try {
        // Create a new comment
        const tar = await Comment.create({
            by: comment.user,
            content: comment.content,
            rating: comment.rating,
        });

        console.log(tar);

        // Use College.id for update instead of _id
        await Service.findOneAndUpdate(
            { id: req.params.id }, // Find the College by its `id` field
            { $push: { comments: tar._id } }, // Push the new comment ID to the comments array
            { new: true } // Option to return the updated document
        );

        console.log('Updated Service with new comment');

        // Respond with the newly created comment
        res.json(tar);
    } catch (err) {
        next(err);
    }
};
module.exports = { addCComment,addSComment };
