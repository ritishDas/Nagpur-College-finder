const {Router}=require("express");
const {emailEntry,verify,login}=require("../controllers/user.js");

const router=Router();


router.route("/email").post(emailEntry);
router.route("/verify").post(verify);
router.route("/login").post(login);

//router.route("/password").post();
module.exports=router;
