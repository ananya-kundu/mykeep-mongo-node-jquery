var express = require('express'),
	router = express.Router();
var auth=require("./authenticate");
console.log("I'm in index.js");

router.use(require("./session"));
router.use(require('./signup'));
router.use(require('./login'));
router.use(require('./logout'));

router.use("/readuserprofile",auth,require("./userprofile"));
router.use("/createcards",auth,require("./createcards"));

router.use("/pinup",auth,require("./pinup"));
router.use("/deletemsgcard",auth,require("./deletemsgcard"));
router.use("/popupcard",auth,require("./popupcard"));
router.use("/updatemsgcards",auth,require("./updatemsgcards"));


module.exports = router;
