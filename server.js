var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('User connected via socket.io');

    socket.on('message', function (hovnocuc) {
        console.log('Message received: ' + hovnocuc.text);

        // toto posiela spravu vsetkym, okrem odosielatela
        // socket.broadcast.emit('message', hovnocuc);

        // toto aj odosielatovi
        io.emit('message', hovnocuc);
    });

    socket.emit('message', {
        text: 'Welcome to the chat application!'
    });
});

http.listen(PORT, function () {
    console.log('Server started');
});
