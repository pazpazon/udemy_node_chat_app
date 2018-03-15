var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Server has disconnected...');
});

socket.on('newMessage', (message) => {
  console.log('newMessage received', message);
});
