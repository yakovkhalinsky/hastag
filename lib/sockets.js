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
    console.log('game', games[gameId]);
    // console.log('service.sockets.connected', service.sockets.connected);
    service.to(players[0]).emit('start', 'for your eyes only');
    // service.sockets.connected[players[0]].emit('start');
};

var setup = function(io) {
    service = io;
    io.on('connection', function(socket) {
        console.log('a user connected', socket.conn.id);
        newPlayer(socket.conn.id)

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('turn', function(message) {
            console.log('turn', message);
        });
    });
};

module.exports = setup;

