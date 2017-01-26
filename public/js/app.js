var socket = io();

socket.on('connect', function () {
    console.log('Connected to socket.io server');
});

socket.on('message', function (hovnocuc) {
    var momentTimeStamp = moment.utc(hovnocuc.timestamp);
    console.log('New message: ' + hovnocuc.text);

    jQuery('.messages').append('<p><strong>' + momentTimeStamp.local().format('h:mm a') + '</strong>: ' +  hovnocuc.text + '</p>');
});

// handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();
    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        text: $message.val()
    });

    $message.val('');
});