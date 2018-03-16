const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use('/', express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user just joined the chat'));
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage received:', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('disconnect', () => {
    console.log('Client has disconnected...');
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A user has disconnected'));
  });
});

server.listen(port, () => {
  console.log(`up on PORT:${port}`);
});


