var express = require('express'),
 	app = express(),
	bodyParser = require('body-parser');
var connection = require ('./config/config.js');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(cors());
app.use(require('./controller'));

var port = process.env.PORT || 8081;
	app.listen(port,function(){
    connection.mongoconnection();
		console.log('Server is running on port :: ',+port);
	});
