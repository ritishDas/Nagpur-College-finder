const express=require('express');
const crypto=require("crypto");
const nodemailer=require("nodemailer");
const cors=require("cors");
const app=express();
const port=7000;
app.use(express.json());
app.use(cors());

function generateOTP() {
    const otp = crypto.randomInt(100000, 999999);  // Generates a 6-digit number
    return otp;
}
function checkOTP(req,res,next){

}


app.post('/register',async(req,res)=>{
try{const email=req.body.email;
console.log(email);
    const otp=generateOTP();
    console.log(otp);
const transporter = nodemailer.createTransport({
        service: 'gmail',  // Use 'gmail', 'yahoo', etc. or configure your SMTP
        auth: {
            user: 'ritishdas116@gmail.com',        // Your email
            pass: 'ecis xzng bqnm tfix'          // Your email password or app-specific password
        }
    });

    // Email content
    const mailOptions = {
        from: 'ritishdas116@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    };

    // Send the email
    
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    
    return res.status(200).json({"success":"email sent to you "});
}
catch(err){
    console.log(err);
}
});



app.listen(port,()=>{console.log("server listening on",port);})
