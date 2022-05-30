const
  {
    NODE_ENV,
    DBPORT,
    DBNAME,
    DBPASS,
    DBUSER,
    DBHOST,
    SERVERURL,
    SSDTECH_USER,
    SSDTECH_PASS,
    SSDTECH_URL,
    TECHBHAI_APIKEY,
    TECHBHAI_SENDERID,
    TECHBHAI_URL
  } = process.env;

module.exports = {
  nodeEnvironment: NODE_ENV,
  apiURL: SERVERURL,
  mongoURI: `mongodb+srv://${DBUSER}:${DBPASS}@${DBHOST}/${DBNAME}`
    + '?retryWrites=true&w=majority',
  ssdtech_username: SSDTECH_USER,
  ssdtech_password: SSDTECH_PASS,
  ssdtech_server: SSDTECH_URL,
  techbhai_key: TECHBHAI_APIKEY,
  techbhai_senderID: TECHBHAI_SENDERID,
  techbhai_server: TECHBHAI_URL
};
