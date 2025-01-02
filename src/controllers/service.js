const Service = require("../models/service.js");
const User = require("../models/user.js");
const cloudinary = require("../utils/cloudinary.js");

let latestid=1;

const addService = async(req,res,next)=>{
    try{

        const files = req.files;
        const links = [];

        for (const tar of files) {
           const {url} = await cloudinary(tar.path);
            links.push(url);
        }
        const data = req.body;
        const service=await Service.create({
            id: latestid++,
            name: data.name,
            type: data.type,
            location: data.location,
            price:Number(data.price),
            llink: data.llink,
            photo: links,
            contact:Number(data.contact),
            feature:data.feature
        });
        const user=await User.findById(req.user);
        user.service.push(service);
        await user.save();

        console.log("service added");
        res.json({message:"Service Added Successfully"});
    }
    catch(err){
        next(err);
    }


}

const allService = async(req,res,next)=>{
    try{
        const services= await Service.find().select({
            type:1,name:1,photo:1,location:1,id:1,price:1
        });
        return res.json(services);

    }
    catch(err){
        next(err);
    }
}
const fetchService = async(req,res,next)=>{
try{
        const id=req.params.id;
        const service = await Service.find({id}).populate({
            path:"comment",
            populate:{
                path:"by",
                select:"name"
            }
        });
        return res.json(service); 


}
    catch(err){
next(err);
    }
}
const saveService = async(req,res,next)=>{
	try {
		const id = req.params.id;
		const service = await Service.findOne({ id }).select({ _id: 1 });

		if (!service) {
			return res.status(404).json({ message: "Service not found" });
		}

		const user = await User.findById(req.user);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		if(!user.favser.includes(service._id)){
			user.favser.push(service._id);
			await user.save();
		}
			res.json({ message: "Service added to favorites" });
		}
	catch (err) {
		next(err);
	}

}

const removeService = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id, req.user);

        // Find the college by the given ID
        const service = await Service.findOne({ id }).select({ _id: 1 });

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        // Find the user by the authenticated user ID
        const user = await User.findById(req.user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove the college ID from the user's favorites
        user.favser = user.favser.filter(favId => !favId.equals(service._id));
        await user.save();

        res.json({ message: "Service removed from favorites" });
    } catch (err) {
        next(err);
    }
};

module.exports = {removeService,addService,allService,fetchService,saveService};
