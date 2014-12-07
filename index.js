var http = require('http');
var path = require('path');
var express = require('express');

var app = express();

var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var bodyHandler = require('./lib/body');

app.use(bodyHandler);
app.use(express.static(__dirname, '/public'));

app.set('view engine', 'jade');

app.get('/', function(req, res){
    res.render('index');
});

server.listen(port, function(){
    console.log('listening on *:' + port);
});
