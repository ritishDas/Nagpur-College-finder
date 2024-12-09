const College=require("../models/college.js");
const Comment=require("../models/comment.js");


const allCollege=async (req,res,next)=>{
try{

    const colleges=await College.find().select  ({id:1,name:1,photo:{$slice:1},location:1});
    
    res.json(colleges);
}
catch(err){ 
next(err);
}
}



const findCollege=async(req,res,next)=>{
try{
const id=req.params.id;
const college = await College.find({id}).populate({
                path: 'comments',
                populate: {
                    path: 'by',
                    
                },
            })
            



    res.json(college);
}
    catch(err){  res.json(
    {
        success:false,
        message:err
    }
);
    next(err);
    }
}

module.exports={allCollege,findCollege};
