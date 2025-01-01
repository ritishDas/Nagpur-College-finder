const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userLogin = async (req, res, next) => {
    try {
        const data = req.body;

        const user = await User.findOne({ email: data.email });
        if (!user) return res.status(404).json({ message: "No user found" });

        const passcheck = await bcrypt.compare(data.password, user.password);
        if (!passcheck) return res.status(401).json({ message: "Incorrect password" });

        const token = user.generateToken();
console.log("user logged in");
        res.cookie("token", token, { httpOnly: true,secure:true,sameSite:'None' }).json({ message: "User logged in" });
    } catch (err) {
        next(err);   
    }
};

const loginCheck=(req,res,next)=>{
    try{
        const token=req.cookies?.token;
        if(!token){
            return res.json({login:false,
"message":"no token found"
});
        }
        const tokencheck = jwt.verify(token,process.env.TOKEN_SECRET);
        if(tokencheck) return res.json({login:true});
        else return  res.json({login:false,
message:"wrong token"
});

    }
    catch(err){
        next(err);
    }
};


const fetchUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user).select({password:0})
.populate("service").populate("favser").populate("favcoll");

        return res.json(user);
    }
    catch(err){
        next(err);
    }

};

const registerUser = async(req,res,next)=>{
    try{
        const {email,name,password} = req.body;
console.log(req.body);
        const hashedPass = await bcrypt.hash(password,10);
        await User.create({email,name,password:hashedPass});
        res.json({"success":true,message:"user created successfully"});
    }
    catch(err){
        next(err);
    }

}

module.exports={userLogin,loginCheck,fetchUser,registerUser};
