var socket = io();

function scrollDown(){
//Selectors
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');

//Heights
var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight(); 

if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
  messages.scrollTop(scrollHeight);
}
};

socket.on('connect', function(){
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err){
    if (err){
      alert(err);
      window.location.href='/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function(){
  console.log('Server has disconnected...');
});

socket.on('updateUserList', function(users){
  var ol = jQuery('<ol></ol>');
  
  users.forEach( function(user){
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
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
  scrollDown();
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
  scrollDown();
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



