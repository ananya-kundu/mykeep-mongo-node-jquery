var mongoose = require("mongoose");
var express = require('express');


var validators = require("mongoose-validators");
var  crypto = require('crypto');
var jwt    = require('jsonwebtoken');
var secretKey = require('../config/config.js');
// app.set('superSecret', secret);
var Schema = mongoose.Schema;


var userData = Schema({
  userName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    validate : validators.isAlpha()
  },
  mobileNo :{
    type: Number,
    required: true,
    min : 10
    // max : 10
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate : validators.isEmail()
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100
  },

}, {collection: "userRegisterSchema"});

//password encryption at signup
userData.statics.encrypt = function encrypt(text) {
  var cipher = crypto.createCipher(secretKey.algorithm,secretKey.password);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
//save user data at signup
userData.statics.saveUserData = function(reqData, cb) {
  var ref = this ;
  this.findOne({ email: reqData.email }, function(err, exist) {
    if (exist) {
      cb(null,false);
    } else {
        var userObj = new ref(reqData);
        var encryptPassword = userData.encrypt(reqData.password);
        userObj.password = encryptPassword;
        // console.log(encryptPassword);
        userObj.save(cb);
        }
  });
}

userData.statics.checkLoginData = function(loginData, cb) {
    this.findOne({email: loginData.email }, cb);
    //  this.find({d_no:req._id},cb);
  }

//
  userData.statics.getUserProfile = function(userid, cb) {
    var ref = this ;
    this.find(userid,cb);
}
  //model creation
var userData = mongoose.model('userRegisterSchema', userData);
module.exports = userData;
