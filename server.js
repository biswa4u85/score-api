const cors = require('cors');
const socket = require("./util/socket");
const https = require('https');
const fs = require('fs');
const app = require("./startup/express").default();
const portNumber = process.env.PORT;
const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/score.techwizards.io/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/score.techwizards.io/fullchain.pem'),
}, app);

httpsServer.listen(portNumber, () => {
  console.log(`Listening on port ${portNumber}`);
});
socket.listen(httpsServer);