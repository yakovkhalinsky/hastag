var uuid = require('node-uuid');

var players = [];
var games = {};

var service = null;

var newPlayer = function(playerId) {
    players.push(playerId);
    if (players.length === 2) { // we're ready to start a game
        var gameId = uuid.v4();
        games[gameId] = players.map(function(id) { return id; });
        players.length = 0;
        initiateGame(gameId);
    };
};

var initiateGame = function(gameId) {
    var players = games[gameId];
    service.socket(players[0]).emit('start');
    //service.socket(players[1]).emit('start');
};

var setup = function(io) {
    service = io;
    io.on('connection', function(socket) {
        console.log('a user connected', socket.conn.id);
        newPlayer(socket.conn.id)
        players.push(socket.conn.id);
        if (players.length === 2) { // we're ready to start a game
            var gameId = uuid.v4();
            games[gameId] = players.map(function(id) { return id; });
            players.length = 0;
            initiateGame(gameId);
        };

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('turn', function(message) {
            console.log('turn', message);
        });
    });
};

module.exports = setup;

