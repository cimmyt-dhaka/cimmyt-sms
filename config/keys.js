const
  {
    NODE_ENV,
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
  mongoURI: NODE_ENV === 'production'
    ? `mongodb://${DBUSER}:${DBPASS}@${DBHOST_00}:${DBPORT},${DBHOST_01}:${DBPORT},${DBHOST_02}:${DBPORT}/${DBNAME}`
    + '?ssl=true&replicaSet=atlas-ap6dbh-shard-0&authSource=admin&retryWrites=true&w=majority'
    : `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
}