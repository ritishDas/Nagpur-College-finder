const {Router}=require("express");
const {allCollege,findCollege}=require("../controllers/college.js");
const router=Router();


router.route("/allcollege").get(allCollege);
router.route("/:id").get(findCollege);


module.exports=router;
