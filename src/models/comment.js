const mongoose=require( "mongoose");

const commentSchema=new mongoose.Schema({
	content:{
		type:String,
		required:true,
	},
        by:{
        	 type:mongoose.Schema.Types.ObjectId,
		 ref:"User",
		 required:true,
	},
	rating:{
		type:Number,
		required:true,
	}}
,{timestamps:true});
const Comment=mongoose.model("Comment",commentSchema);

module.exports=Comment;
