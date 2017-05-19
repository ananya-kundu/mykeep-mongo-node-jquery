var mongoose = require("mongoose");

var db = "mongodb://localhost/RegisterLoginDatabase";

module.exports = {"secret":"ananya123",
                  "algorithm":"aes-256-ctr",
                  "password" : "d6F3Efeq",
                  "mongoconnection": function () {
                      mongoose.connect(db,function(err){
                        if(err) {
                          console.error(err);
                        }
                    });
                    mongoose.connection.once('connected',function(){
                      console.log("connected to Database" );
                    });
                  }
                }
