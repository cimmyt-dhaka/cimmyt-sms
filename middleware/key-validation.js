const
  isEmail = require('../utils/is-email.js'),
  isMongoOID = require('../utils/is-mongo-oid.js'),
  Users = require('../models/Users.js');

module.exports = async (req, res, next) => {
  const { apikey } = req.query;

  try {
    if (!apikey) return res
      .status(401)
      .json({ msg: 'Please provide a key' });

    const decodedArr = Buffer.from(apikey, 'base64').toString('ascii').split('+');
    if (typeof decodedArr !== 'object' || decodedArr.length !== 2) return res
      .status(401)
      .json({ msg: 'Invalid key, please provide a valid key' });

    const [oid, email] = decodedArr;
    if (!isMongoOID(oid) || !isEmail(email)) return res
      .status(401)
      .json({ msg: 'Invalid key, please provide a valid key' });

    const user = await Users.findById(oid);
    if (user.email === email) {
      req.user = user;
      next();
    } else {
      return res
        .status(401)
        .json({ msg: 'Invalid key, please provide a valid key' });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: 'Invalid key, please provide a valid key' });
  }
};
