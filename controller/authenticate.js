 var express = require('express');
var    router = express.Router();
 var jwt = require('jsonwebtoken');
 var secretKey = require('../config/config.js');
 // console.log("auth library....");

router.use(function(req, res, next) {
  console.log("auth library....");
 var token = req.headers['x-access-token'] || req.headers.cookie ;
 token = token.substr(7);

 console.log( req.headers.cookie);
 if (token) {
   console.log(token);
   jwt.verify(token, secretKey.secret, function(err, decoded) {
     if (err) {
       res.send({"status": false,"message": "Failed to authenticate token."});
     } else {
       req.decoded = decoded;
      //  console.log( req.decoded.id+" my jhbjhg  hvjh " );
       next();
     }
   });
 } else {
   res.send({"status": false,"message": "No token provided."});
 }
});
module.exports = router;
