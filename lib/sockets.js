var setup = function(io) {
    io.on('connection', function(socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('turn', function(message) {
            console.log('turn', message);
        });
    });
};

module.exports = setup;

