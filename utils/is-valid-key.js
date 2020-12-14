const
  Users = require('../models/Users'),
  isEmail = require('./is-email'),
  isMongoOID = require('./is-mongo-oid');

module.exports = key => new Promise((resolve, reject) => {
  if (!key) {
    reject(`Please provide a key`);
  } else {

    const decodedArr = Buffer.from(key, 'base64').toString('ascii').split('+');
    if (typeof decodedArr !== 'object' || decodedArr.length !== 2) {
      reject(`Invalid key`);
    } else {

      const [oid, email] = decodedArr;
      if (!isMongoOID(oid)) {
        reject(`Invalid key`);
      } else if (!isEmail(email)) {
        reject(`Invalid key`);
      } else {
        Users.findById(oid)
          .then(user => {
            console.log("Valid user: ", user._doc);
            resolve(user.email === email);
          })
          .catch(err => {
            console.log("Caught error: ", err);
            reject(err);
          });
      }
    }
  }
});
