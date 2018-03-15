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
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Moshiko Katan',
    text: 'Wat\'s going on bro?!?!?!',
    createdAt: 98743265
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage received:', message);
  });

  socket.on('disconnect', () => {
    console.log('Client has disconnected...');
  });
});

server.listen(port, () => {
  console.log(`up on PORT:${port}`);
});


