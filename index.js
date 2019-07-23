const express = require ('express');
const app = express ();

//SETTINGS

app.set('port', process.env.PORT || 3000)

//STATIC FILES

app.use (express.static('public'));

//Starting the Server
const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});

//WEBSOCKETS
const SocketIO = require ('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
console.log('new connection', socket.id);

socket.on('chat:message', (data) => {
  io.sockets.emit('chat:message', data);
  })
  socket.on('chat:typing', (data) => {
    socket.broadcast.emit('chat:typing', data);
  })
});
