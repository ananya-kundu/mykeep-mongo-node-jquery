var express = require('express'),
 router = express.Router();

var dashboard = require('../model/dashBoardSchema.js');
// var connDb1 = require("../config");
//
// var validator = require('express-validator');
// 	router.use(validator());

  router.post('/', function(req,res){
    // console.log(req);
    try{

      var userid = req.decoded.id;
      var msg = {
        d_no : userid,
        title1 : req.body.title1,
        content : req.body.content
      }
      console.log(msg);
    dashboard.saveMsgData(msg,function(err,result){
      if(!err){
          res.send({"status":true,"message": "data successfully saved.."});
      }
      else {
          res.send({"status": false,"msg": "data is not saved"});
      }

  });
} catch (e) {
  console.log(e);
   res.send ({"status": false,"message": "server error"});
  }
});

 module.exports = router;
