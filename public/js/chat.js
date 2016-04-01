$(document).ready(function() {
  console.log('Document ready');
  const clientSocket = io();

  $('#send').bind('click', function(event) {
    clientSocket.emit('message', $('#message').val());
    $('#message').val('');
  });

  clientSocket.on('message', function(message) {
    const chat = $('#chat');
    chat.html(chat.html() + message + '&#10');
  });
});
