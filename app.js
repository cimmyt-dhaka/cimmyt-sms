const
  express = require('express'),
  { urlencoded, json } = require("body-parser"),
  { connect } = require("mongoose"),
  swaggerJsdoc = require("swagger-jsdoc"),
  { serve, setup } = require("swagger-ui-express"),

  port = process.env.PORT || 5000,

  { apiURL, mongoURI } = require('./config/keys'),
  sms = require('./routes/sms'),

  app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use('/sms', sms);

const optsSwagger = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CIMMYT SMS API",
      version: "0.1.0",
      description:
        "An API to send SMS for CIMMYT's apps and activities",
      // license: {
      //   name: "MIT",
      //   url: "https://spdx.org/licenses/MIT.html",
      // },
      contact: {
        name: "CIMMYT-Dhaka",
        email: "m.billah@cgiar.org",
        url: "https://www.cimmyt.org/"
      },
    },
    servers: [
      { url: `${apiURL}/sms` }
    ],
  },
  apis: ["./routes/sms.js"],
};

app.use(
  "/api-docs",
  serve,
  setup(swaggerJsdoc(optsSwagger))
);

connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`MongoDB connected`);
    app.listen(
      port,
      () => { console.log(`app.js initiated on port ${port}`); }
    );
  })
  .catch(err => { console.log("Failed to connect MongoDB: ", err); });
