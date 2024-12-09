const mongoose=require( "mongoose");

const collegeSchema=new mongoose.Schema(
    {
        id:{
     type:Number,
     required:true,
    },
    name:{
		type:String,
		required:true,
	},
   	comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"

        }
	],
    feature:[{
        type:String,
    }],
     photo:[{
        type:String,
    }],
   website:{
       type:String,
           required:true,
   },
    location:{
		type:String,
		required:true,
    },
    llink:{
            type:String,
        }
    }
);
const College=mongoose.model("College",collegeSchema);

module.exports=College;
