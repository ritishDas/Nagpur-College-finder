const {v2} = require("cloudinary");
const fs=require("fs").promises;


v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,

});

async function cloudinary(filepath){
    let link;
    try{
        link =  await v2.uploader.upload(filepath);
        console.log("Uploaded to Cloudinary");

    }
    catch(err){

        console.log("Failed to upload on Cloudinary :",err);
    }
    finally{
await fs.unlink(filepath);
    }
    return link;
}

module.exports=cloudinary;
