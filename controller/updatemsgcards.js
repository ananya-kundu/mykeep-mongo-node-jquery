var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todocards = require('../model/dashBoardSchema.js');
router.post('/:userid', function(req, res) {
    try {
          // console.log("updateData");
            var updatedata =req.params.userid;
            console.log("data",req.body);

            console.log("idddd",updatedata);
            todocards.updateData(updatedata,req.body,function(err, result) {
              // console.log(updatedata);
              if (!err) {
                res.send({"status": true,"message": result});
              } else {
                res.send({"status": false,"message": err});
              }
            });
    } catch (e) {
        res.send({"status": false,"message": "server error"});
    }
});
module.exports = router;
