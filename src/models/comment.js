const mongoose=require("mongoose");

const commentSchema=new mongoose.Schema({
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    content:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    }

});

const Comment=mongoose.model("Comment",commentSchema);
module.exports=Comment;
