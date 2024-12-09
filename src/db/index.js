const mongoose=require("mongoose");

async function connect(){
try{
await mongoose.connect(process.env.MONGODB_URI);
console.log("mongodb connected");
}
catch(err){
console.log(err);
 return;
}


}
module.exports=connect;
