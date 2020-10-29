console.log(" The socket instance");

var io = require('socket.io')();

io.emit('newEvent',"hello");

io.on('newEvent', (data) => {
  console.log(" The socket instance", { data });
});

module.exports = io;