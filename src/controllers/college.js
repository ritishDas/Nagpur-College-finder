const College = require("../models/college.js");
const Comment = require("../models/comment.js");
const User = require("../models/user.js");
const cloudinary = require("../utils/cloudinary.js");

let latestid = 4;

const addCollege = async (req, res, next) => {
    try {
        const files = req.files;
        const links = [];

        for (const tar of files) {
           const {url} = await cloudinary(tar.path);
            links.push(url);
        }
console.log(links);
        const data = req.body;
        await College.create({
            id: latestid++,
            name: data.name,
            location: data.location,
            llink: data.llink,
            photo: links,
            website: data.website,
            feature:data.feature
        });

        console.log("New College Added");
        res.json({message:"New College Added"});
    } catch (err) {
        next(err);
    }
};


const allCollege=async(req,res,next)=>{
    try{
        const colleges=await College.find().select({
            id:1,name:1,location:1,photo:1
        });

        res.json(colleges);
    }
    catch(err){
        next(err);
    }
};

const fetchCollege=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const college = await College.find({id}).populate({
            path:"comment",
            populate:{
                path:"by",
                select:"name"
            }
        });
        return res.json(college); 

    }
    catch(err){
        next(err);
    }

};

const saveCollege = async (req, res, next) => {
    try {
        const id = req.params.id;
console.log(id,req.user);
        const college = await College.findOne({ id }).select({ _id: 1 });


        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }

        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.favcoll.push(college._id);
        await user.save();

        res.json({ message: "College added to favorites" });
    } catch (err) {
        next(err);
    }
};


const removeCollege = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id, req.user);

        // Find the college by the given ID
        const college = await College.findOne({ id }).select({ _id: 1 });

        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }

        // Find the user by the authenticated user ID
        const user = await User.findById(req.user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove the college ID from the user's favorites
        user.favcoll = user.favcoll.filter(favId => !favId.equals(college._id));
        await user.save();

        res.json({ message: "College removed from favorites" });
    } catch (err) {
        next(err);
    }
};

module.exports={addCollege,allCollege,fetchCollege,saveCollege,removeCollege}
