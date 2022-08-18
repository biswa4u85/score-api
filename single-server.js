const app = require("./startup/express").default();
const socket = require("./util/socket");

const portNumber = process.env.PORT;
const server = app.listen(portNumber, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on port ${portNumber}`);
  }
});
module.exports = server;
socket.listen(server);