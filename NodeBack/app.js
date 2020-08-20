var routes_v1 = require('./src/routes/v1/routes_v1')
var express = require('express');
var argv = require('minimist')(process.argv.slice(2));
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var subpath = express();
// var logger = require("./src/utils/logController");
var dbConnection = require('./dbconnection');
var app = express();

// Db configuration
global.export = con = mysql.createConnection(dbConnection.local);

app.use(bodyParser());

 /* FORMIDABLE IMPLEMENTATION */
 
//  app.get('/', function (req, res){
//      res.sendFile(__dirname + '/index.html');
//  });
 
//  app.post('/', function (req, res){
//      var form = new formidable.IncomingForm();
 
//      form.parse(req, function(a,b,c){console.log(a,b,c)});
 
//      form.on('fileBegin', function (name, file){
//          file.path = __dirname + '/uploads/' + file.name;
//      });
 
//      form.on('file', function (name, file){
//          console.log('Uploaded ' + file.name);
//      });
 
//      res.sendFile(__dirname + '/index.html');
//  });
 
//  app.listen(3001);

/* END */

 /* MULTER IMPLEMENTATION */

/* END */

// app.use(function(req, res, next) {
//   logger.logInsert(req).then(id => {
//     req["log_id"] = id;
//     res["log_id"] = id;
//     next();
//   })
// });

app.use('/api/v1', routes_v1);

var swagger = require("swagger-node-express").createNew(routes_v1);
app.use(express.static('dist'));
swagger.setApiInfo({
  title: "example API",
  description: "API to do something, manage something...",
  termsOfServiceUrl: "",
  contact: "yourname@something.com",
  license: "",
  licenseUrl: ""
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});


app.use('/static', express.static('static'));

console.log(__dirname);

// Configure the API domain
var domain = 'localhost';
if (argv.domain !== undefined)
  domain = argv.domain;
else
  console.log('No --domain=xxx specified, taking default hostname "localhost".');

// Configure the API port
var port = 4400;

//port = 4400 for dev
if (argv.port !== undefined)
  port = argv.port;
else
  console.log('No --port=xxx specified, taking default port ' + port + '.')

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
console.log('snapJob API running on ' + applicationUrl);


swagger.configure(applicationUrl, '1.0.0');


// Start the web server
app.listen(port);
console.log('App Running on port ' + port);

