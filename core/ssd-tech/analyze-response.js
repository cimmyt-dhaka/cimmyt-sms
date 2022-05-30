module.exports = data => new Promise((resolve, reject) => {
  if (!Array.isArray(data)) {
    console.log(data);
    reject("Unknown error, please check the log");
  } else if (data.length === 1 && data[0].success === 0) {
    reject(data[0].message);
  } else if (data.length > 0 && data.every(el => el.success === 1)) {
    resolve(data.map(el => `${el.msisdn}: ${el.message}`).join('\n'))
  } else {
    console.log(data);
    reject("Unknown error, please check the log");
  }
});
