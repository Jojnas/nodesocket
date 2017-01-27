var socket = io();
var name = getQueryVariable('name') || 'Anyone';
var room = getQueryVariable('room');

jQuery('.room-title').text(room);

socket.on('connect', function () {
    console.log('Connected to socket.io server');
    socket.emit('joinRoom', {
       name: name,
       room: room
    });
});

socket.on('message', function (hovnocuc) {
    var momentTimeStamp = moment.utc(hovnocuc.timestamp);
    var $message = jQuery('.messages');



    console.log('New message: ' + hovnocuc.text);

    $message.append('<p><strong>' + hovnocuc.name + ' ' + momentTimeStamp.local().format('h:mm a') + ': ' + '</strong></p>');
    $message.append('<p>' + hovnocuc.text + '</p>');
});

// handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();
    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        name: name,
        text: $message.val()
    });

    $message.val('');
});

