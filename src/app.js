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
    origin:'https://ritishdas.github.io',
    credentials: true}
));
app.use(express.json());
app.use(express.urlencoded());


app.use("/api/college",collegeRoute);
app.use("/api/user",userRoute);
app.use("/api/service",serviceRoute);
app.use("/api/comment",commentRoute);



const port=process.env.PORT||"7000";

connectdb().then(()=>{
app.listen(port,()=>{
console.log("Server listening on port:",port);
})
})
.catch(err=>{
console.log("DATABASE CONNECTION FAILED",err);
})
