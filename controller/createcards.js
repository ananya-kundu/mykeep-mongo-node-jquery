var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var dashboard = require('../model/dashBoardSchema.js');

/* POST /todos */
router.post('/', function(req, res) {
    try {
        var userid = req.decoded.id;
            var data = {
              userid:userid,
              title1:req.body.title1,
              content:req.body.content,
            }
            console.log(data);
            dashboard.saveMsgData(data,function(err, result) {
              if (!err) {
                res.send({"status": true,"message": "Your cards data is saved"});
              } else {
                res.send({"status": false,"message": "Your cards data is not saved"});
              }
            });
    } catch (e) {
        res.send({
            "status": false,
            "message": "server error"
        });
    }
});
module.exports = router;
