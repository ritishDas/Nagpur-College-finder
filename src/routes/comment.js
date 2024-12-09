 const {Router}=require("express");
const {addCComment,addSComment} =require("../controllers/comment.js");

const router=Router();

console.log(addCComment);
router.route("/college/:id/comment").post(addCComment);
router.route("/service/:id/comment").post(addSComment);

module.exports=router;
