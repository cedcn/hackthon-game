const _ = require('lodash');

const { config } = require('../config.js');
const pointsMatrix = config.levelOne;

let points = [];
let row = 0,  // 行数
    col = 0,  // 列数
    total = 0;  // 总数

pointsMatrix.forEach((r, x) => {
  row++;
  r.forEach((c, y) => {
    total++;
    points.push({
      x: x,
      y: y,
      v: c
    })
  })
})
col = total / row;

console.log(row, col, total);

const pattern = _.filter(points, item => item.v).map(item => {
  return {
    x: item.x,
    y: item.y
  }
});

const userPattern = [];
const deep = _.cloneDeep(points);

const ioconnect = server => {
  const io = require('socket.io')(server);
  const users = [];
  let index = 0;
  io.on('connection', client => {
    // 有用户进来
    client.on('add user', u => {
      client.name = u.name;
      client.index = index;

      userPattern.push({ x: 0, y: 0 });
      users.push(u.name);

      client.emit('render screen', { points, row, col, selfPoint: userPattern[client.index] });
      index++;
      if(users.length >= 2 ) io.emit('start play', { userPattern });
    });

    client.on('action', newPoint => {
      userPattern[client.index] = newPoint;
      if (_.isEqual(userPattern, pattern)) {
        io.emit('finish game');
      }
      io.emit('other point change', { userPattern });
    })

    client.on('disconnect', () => {
      console.log(userPattern);
      userPattern.splice(client.index, 1);
      console.log(userPattern);
      client.broadcast.emit('user left', { userPattern })
    });
  });

  return io;
}


module.exports = ioconnect;
