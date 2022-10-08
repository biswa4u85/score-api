const app = require("./startup/express").default();
const socket = require("./util/socket");
const http = require('http');
const portNumber = process.env.PORT;
const httpsServer = http.createServer({
  // key: fs.readFileSync('/etc/letsencrypt/live/score.techwizards.io/privkey.pem'),
  // cert: fs.readFileSync('/etc/letsencrypt/live/score.techwizards.io/fullchain.pem'),
}, app);

httpsServer.listen(portNumber, () => {
  console.log(`Listening on port ${portNumber}`);
});
socket.listen(httpsServer);