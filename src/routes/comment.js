const express = require("express");
const authCheck = require("../middlewares/auth.js");
const {collegeComment,serviceComment} = require('../controllers/comment.js');

const router=express.Router();

router.route('/college/:id').post(authCheck,collegeComment);
router.route('/service/:id').post(authCheck,serviceComment);

module.exports=router;
