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

  socket.emit('createMessage', {
    from: 'User', 
    text: jQuery('[name=message-text]').val()
  }, function(){});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (e){
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(err){
    alert('Unable to fetch location...', err);
  });
});



