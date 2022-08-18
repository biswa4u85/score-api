module.exports.corsOptions = {
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization, x-razorpay-signature",
};

module.exports.bodyParser = {
  limit: "50mb",
  urlencoded: {
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  },
};