const jwt=require("jsonwebtoken");

const authcheck= (req,res,next)=>{
/*const token=req.cookies?.accessToken;
   if(!token){
return res.json({
    success:false,
    message:"token not found pls try again"
});
   }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
if(!decodedToken){
return res.json({success:false,message:"invalid token"});
}
req.email=decodedToken.email; */
req.user="671dff5c1317b87b1cb1a5fb";
next();
}

module.exports=authcheck;
