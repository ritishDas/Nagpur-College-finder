const mongoose=require( "mongoose");

const serviceSchema=new mongoose.Schema(
    {	name:{
		type:String,
		required:true,
	},
        by:{
        	 type:mongoose.Schema.Types.ObjectId,
		 ref:"User",
		 required:true,
	},
    comments:[

		{

            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"}
	],       
    photo:[{
        type:String,
    }],
	price:{
		type:Number,
		required:true,
	},
	terms:[
		{
			type:String,
		}
	],
        location:{
		type:String,
		required:true,
        },
	contact:{
		type:Number,
		required:true,
	},}
	);
const Service=mongoose.model("Service",serviceSchema);

module.exports=Service;
