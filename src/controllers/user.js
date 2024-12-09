const jwt=require("jsonwebtoken");
const nodemailer=require("nodemailer");
const crypto=require("crypto");
const User=require("../models/user.js");

const emailEntry=async(req,res,next)=>{
    try{
const email=req.body.email;
const name=req.body.name;

const user= await User.findOne({email});
        if(user){
return res.json({success:false,
message:"Email already registered"});
        }
        console.log(email,name);
        const otp = crypto.randomInt(100000, 999999);

const accessToken=jwt.sign(
        {
            email,
            otp,
            name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'5m'
        });

const transporter = nodemailer.createTransport({
        service: 'gmail',        
    auth: {
            user: process.env.GMAIL,       
            pass: process.env.GMAILPASS            }
    });

    const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    };

    
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
 const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options).json({success:true,
    message:"otp sent successfully"});
    }
    catch(err){
        next(err);
    }


}
const verify=async (req,res,next)=>{
try{
    const otp=req.body.otp;
const token=req.cookies?.accessToken;
   if(!token){
return res.json({
    success:false,
    message:"token not found pls try again"
});
   }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
   if(otp==decodedToken.otp) 
    {
const password=req.body.password;
       await User.create({
            name:decodedToken.name,
            email:decodedToken.email,
            password
        });
res.status(200).send("user registered successfully");
    }else{
return res.json({success:false,message:"wrong otp"});
    }

}
catch(err){
    next(err);
}
}

const login=async(req,res,next)=>{
try{
const input=req.body;
const user=await User.findOne({email:input.email});
    if(!user){
res.json({
    success:false,
    message:"no user found"
});
    }
    const passcheck=await user.isPasswordCorrect(input.password);
if(!passcheck){
return res.json({
    success:false,
    message:"incorrect password"
});
}
  const accessToken=user.generateAccessToken();

  const refreshtoken=user.generateRefreshToken();
user.refreshtoken=refreshtoken;
    await user.save();
 const options = {
        httpOnly: true,
        secure: true
    }
        console.log(accessToken);
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
.cookie('refreshToken',refreshtoken,options).json({success:true});
}
catch(err){
next(err);
}
}

module.exports={emailEntry,verify,login};
