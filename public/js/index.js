var socket = io();

socket.on('connect', function(){
  console.log('Connected to server');
});

socket.on('disconnect', function(){
  console.log('Server has disconnected...');
});

socket.on('newMessage', function(message){
  var time = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: time
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(locationMessage){
  var time = moment(locationMessage.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    url: locationMessage.url,
    from: locationMessage.from,
    createdAt: time
  });
  jQuery('#messages').append(html);
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



