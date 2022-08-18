module.exports.corsOptions = {
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization, x-razorpay-signature",
};

module.exports.PORT = 3005;
module.exports.REDISURL = 'redis://:U2HprsnUISYYpFoHEQeZyUq3wiUTOjlV@redis-14183.c56.east-us.azure.cloud.redislabs.com:14183';
module.exports.RAPIDAPIURL = 'https://cricket-live-data.p.rapidapi.com';
module.exports.RAPIDAPIKEY = 'ceff4f9011mshb4a79448651b42dp119c71jsn663c2e90ee8a';
module.exports.RAPIDAPIHOST = 'cricket-live-data.p.rapidapi.com';

module.exports.bodyParser = {
  limit: "50mb",
  urlencoded: {
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  },
};
