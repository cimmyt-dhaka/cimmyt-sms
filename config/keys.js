const
  {
    NODE_ENV,
    SMSAPIKEY,
    SMSURL,
    SMSSENDERID,
    DBUSER,
    DBPASS,
    DBHOST,
    DBHOST_00,
    DBHOST_01,
    DBHOST_02,
    DBPORT,
    DBNAME
  } = process.env;

module.exports = {
  nodeEnvironment: NODE_ENV,
  smsKey: SMSAPIKEY,
  smsServer: SMSURL,
  smsSenderID: SMSSENDERID,
  mongoURI: NODE_ENV === 'development'
    ? `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
    : `mongodb://${DBUSER}:${DBPASS}@${DBHOST_00}:${DBPORT},${DBHOST_01}:${DBPORT},${DBHOST_02}:${DBPORT}/${DBNAME}`
    + '?ssl=true&replicaSet=atlas-ap6dbh-shard-0&authSource=admin&retryWrites=true&w=majority'
}
