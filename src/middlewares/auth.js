const jwt = require("jsonwebtoken");


const authCheck = (req,res,next) => {
    try{
        const token = req.cookies?.token;
        if(!token) return res.status(401).json({message:"Please Login First"});
        const tokencheck=jwt.verify(token,process.env.TOKEN_SECRET); 
        if(tokencheck) req.user=tokencheck._id;
        else return res.status(401).json({message:"Please Login Again"});
        console.log("user confirm");
        next();

    }
    catch(err){
        next(err);
    }
}

module.exports = authCheck;
