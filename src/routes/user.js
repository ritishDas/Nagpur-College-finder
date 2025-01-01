const express=require("express");
const {loginCheck,userLogin,registerUser,fetchUser} = require("../controllers/user.js");
const authCheck = require("../middlewares/auth.js");

const router=express.Router();

router.route('/auth').get(loginCheck);
router.route('/login').post(userLogin);
router.route('/register').post(registerUser);
router.route('/user').get(authCheck,fetchUser);

module.exports=router;
