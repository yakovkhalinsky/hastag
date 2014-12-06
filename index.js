var path = require('path');
var express = require('express');

var bodyHandler = require('./lib/body');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyHandler);
app.use(express.static(__dirname, '/public'));

app.set('view engine', 'jade');

app.get('/', function(req, res){
    res.render('index');
});

app.listen(port, function(){
    console.log('listening on *:' + port);
});
