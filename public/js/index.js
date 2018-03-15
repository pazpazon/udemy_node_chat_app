var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'yosale gibor',
    text: 'not too shabby!'
  })
});

socket.on('disconnect', () => {
  console.log('Server has disconnected...');
});

socket.on('newMessage', (message) => {
  console.log('newMessage received', message);
});
