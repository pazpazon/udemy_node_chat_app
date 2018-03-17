var socket = io();

socket.on('connect', function(){
  console.log('Connected to server');
});

socket.on('disconnect', function(){
  console.log('Server has disconnected...');
});

socket.on('newMessage', function(message){
  console.log('newMessage received', message);
  var li =  jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(locationMessage){
  console.log('newLocationMessage received', locationMessage);
  var li =  jQuery('<li></li>');
  var link = jQuery('<a target="_blank">Location</a>');

  li.text(`${locationMessage.from}: `);
  link.attr('href', locationMessage.url);
  li.append(link);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  var messageTextbox = jQuery('[name=message-text]');
  socket.emit('createMessage', {
    from: 'User', 
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (e){
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location >>');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(err){
    locationButton.removeAttr('disabled').text('Send location >>');
    alert('Unable to fetch location...', err);
  });
});



