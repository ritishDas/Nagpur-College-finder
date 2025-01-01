require("dotenv").config();
const express=require("express");
const cors=require("cors");
const path=require("path");
const cookie_parser = require("cookie-parser");
const connectdb=require("./database/connect.js");
const collegeRoute = require("./routes/college.js");
const userRoute = require("./routes/user.js");
const serviceRoute = require("./routes/service.js");
const commentRoute = require("./routes/comment.js");


const app=express();

app.use(cookie_parser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true}
));
app.use(express.json());
app.use(express.urlencoded());
//app.use("/i*",express.static(path.join(__dirname,"../public")));


app.use("/api/college",collegeRoute);
app.use("/api/user",userRoute);
app.use("/api/service",serviceRoute);
app.use("/api/comment",commentRoute);

app.get("/i*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/index.html"))
});



const port=process.env.PORT||"7000";

connectdb().then(()=>{
app.listen(port,()=>{
console.log("Server listening on port:",port);
})
})
.catch(err=>{
console.log("DATABASE CONNECTION FAILED",err);
})