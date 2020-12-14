const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$"); // https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid

module.exports = str => checkForHexRegExp.test(str);
