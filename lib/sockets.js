var uuid = require('node-uuid');

var players = [];
var games = {};
var playerGameMap = {};

var service = null;

var newPlayer = function(playerId) {
    players.push(playerId);
    if (players.length === 2) { // we're ready to start a game
        var gameId = uuid.v4();
        games[gameId] = players.map(function(id) {
            playerGameMap[id] = gameId;
            return id;
        });
        players.length = 0;
        initiateGame(gameId);
    };
};

var initiateGame = function(gameId) {
    var players = games[gameId];
    console.log('game', games[gameId]);
    // console.log('service.sockets.connected', service.sockets.connected);
    service.to(players[0]).emit('start', true);
    service.to(players[1]).emit('start', false);
    // service.sockets.connected[players[0]].emit('start');
};

var playTurn = function(playerId, columns) {
    var gameId = playerGameMap[playerId];
    var game = games[gameId];
    game.forEach(function(pId){
        if (pId !== playerId) {
            service.to(pId).emit('applyMovement', columns);
        }
    });
};

var setup = function(io) {
    service = io;
    io.on('connection', function(socket) {
        console.log('user connected', socket.conn.id);
        newPlayer(socket.conn.id)

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('applyMovement', function(columns) {
            console.log('received message: ',columns);
            console.log(columns.column3);
            playTurn(socket.conn.id, columns);
        });
    });
};

module.exports = setup;

