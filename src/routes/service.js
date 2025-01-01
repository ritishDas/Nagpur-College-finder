const express = require("express");
const authCheck = require("../middlewares/auth.js");
const multer = require("../middlewares/multer.js");
const {removeService,addService,allService,fetchService,saveService} = require("../controllers/service.js");

const router = express.Router();

router.route("/addService").post(authCheck,multer.array("photos",5),addService);
router.route("/allService").get(allService);
router.route("/:id").get(fetchService);
router.route("/save/:id").put(authCheck,saveService);
router.route("/remove/:id").put(authCheck,removeService);

module.exports=router;
