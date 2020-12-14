const
  express = require('express'),
  { urlencoded, json } = require("body-parser"),
  { connect } = require("mongoose"),
  // swaggerJsdoc = require("swagger-jsdoc"),
  // swaggerUi = require("swagger-ui-express"),
  port = process.env.PORT || 5000,
  { mongoURI } = require('./config/keys'),
  sms = require('./routes/sms'),

  app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use('/sms', sms);

connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`MongoDB connected`);
    app.listen(
      port,
      () => { console.log(`app.js initiated on port ${port}`); }
    );
  })
  .catch(err => { console.log("Failed to connect MongoDB: ", err); });
