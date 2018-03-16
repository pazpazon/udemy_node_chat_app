const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use('/', express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  // log to console
  console.log('New user connected');
  // broadcast to all other users
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user just joined the chat',
    createdAt: new Date().getTime()
  });
  // personal message to new user
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage received:', message);

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    // log to console
    console.log('Client has disconnected...');
    // send message to all users
    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'A user has disconnected'
    });
  });
});

server.listen(port, () => {
  console.log(`up on PORT:${port}`);
});


