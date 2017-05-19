var express = require('express');
var app = express(),
 router = express.Router();

var dashboard = require('../model/dashBoardSchema.js');
// var connDb1 = require("../config");
//
// var validator = require('express-validator');
// 	router.use(validator());
  router.get('/', function(req,res){
    console.log("req"+req);
      var userid = req.decoded.id;
    dashboard.getMsgData(userid,function(err,result){
      if(!err){
        console.log("i'm getmsg");
          res.send({"status":true,"message": result});
      }
      else {
          res.send({"status": false,"msg": err});
      }

  });
});

 module.exports = router;
