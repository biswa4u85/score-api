const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("../config/environment");

module.exports.default = () => {
  const app = express();
  app.use(require("cloudflare-middleware")());
  app.use(cors(config.corsOptions));
  app.use(bodyParser.json({ limit: config.bodyParser.limit }));
  app.use(
    bodyParser.urlencoded({
      limit: config.bodyParser.urlencoded.limit,
      extended: config.bodyParser.urlencoded.extended,
      parameterLimit: config.bodyParser.urlencoded.parameterLimit,
    })
  );
  app.use("/uploads",express.static('uploads'));
  app.disable("x-powered-by");
  require("dotenv").config();
  return app;
};