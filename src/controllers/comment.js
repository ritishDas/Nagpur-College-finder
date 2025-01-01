const College = require("../models/college.js");
const Service = require("../models/service.js");
const Comment = require("../models/comment.js");

const collegeComment = async(req,res,next) => {
    try{
        const data = req.body;
        console.log(data,req.user);
        const comment = await Comment.create({
            by:req.user,
            content:data.content,
            rating:data.rating,
        });
        const id=req.params.id;
        const college = await College.findOne({id});
        college.comment.push(comment._id);
        await college.save();
        res.json({message:"comment added "});

    }
    catch(err){
        next(err);
    }
}
const serviceComment = async(req,res,next) => {
    try{
        const data = req.body;
        const comment = await Comment.create({
            by:req.user,
            content:data.content,
            rating:data.rating,
        });
        const id=req.params.id;
        const service = await Service.findOne({id});
        service.comment.push(comment._id);
        await service.save();
        res.json({message:"comment added "});

    }
    catch(err){
        next(err);
    }}

module.exports={collegeComment,serviceComment};

