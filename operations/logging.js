module.exports.message = function (msgOrigin, msg, socket) {
  console.log(msgOrigin, msg);
  socket.send(JSON.stringify({ msgOrigin, message: msg }));
};
