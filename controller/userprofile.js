var express = require('express'),
router = express.Router(),
profileinfo = require('../model/userSchema');
router.get('/', function(req,res){
  var uid = req.decoded.id;
  profileinfo.getUserProfile(uid,function(err,result){
    try {
      if(err)  {
        res.send({ "status": true, "message": "user profile not is available"});
      }
      else {
        res.send({"status": false,"message": "user profile available"});
      }
    }
    catch (e){
      res.send({"status": false,"message": "server error"});
    }
  });
});
module.exports = router;
