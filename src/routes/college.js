const express=require("express");
const {removeCollege,addCollege,allCollege,fetchCollege,saveCollege} 
    = require("../controllers/college.js");
const multer=require("../middlewares/multer.js"); 
const authCheck = require("../middlewares/auth.js");

const router = express.Router();

router.route('/addCollege').post(multer.array("photos",5),authCheck,addCollege);
router.route('/allCollege').get(allCollege);
router.route('/:id').get(fetchCollege);
router.route('/save/:id').put(authCheck,saveCollege);
router.route('/remove/:id').put(authCheck,removeCollege);


module.exports=router;
