import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import winston from 'winston';
import IOSocket from './lib/IOSocket';
import settings from './settings';
const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(require("cloudflare-middleware")());
app.all('*', (req, res, next) => {
	// CORS headers
	res.header('Access-Control-Allow-Origin', settings.corsBaseUrl);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization');
	next();
});
app.use(responseTime());
app.use(cookieParser(settings.cookieSecretKey));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const server = app.listen(settings.apiListenPort, () => {
	const serverAddress: any = server.address();
	winston.info(`API running at http://localhost:${serverAddress.port}`);
});
IOSocket.listen(server);