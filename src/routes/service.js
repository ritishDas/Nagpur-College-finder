const {Router}=require("express");
const {addService,allService}=require("../controllers/service.js");
const authcheck=require("../middlewares/auth.js");
const upload=require("../middlewares/multer.js");

const router=Router();


router.route("/addservice").post(authcheck,upload.array('photos',10),addService);
router.route("/allservice").get(allService);

module.exports=router;
