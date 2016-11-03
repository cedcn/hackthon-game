const ioconnect = server => {
  const io = require('socket.io')(server);
  const users = [];

  io.on('connection', client => {
    console.log(client.id)

    client.on('add user', u => {
      users.push(u.name);
      if(users.length >= 2 ) io.emit('start paly');
    });

    client.on('disconnect', data => {
      console.log(data);
    });

    client.on('join room', () => {

    })
  });

  return io;
}


module.exports = ioconnect;
