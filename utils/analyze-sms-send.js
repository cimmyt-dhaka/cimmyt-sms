const errors = [
  { error: 1002, msg: "Sender Id / Masking Not Found" },
  { error: 1003, msg: "API Not Found" },
  { error: 1004, msg: "SPAM Detected" },
  { error: 1005, msg: "Internal Error" },
  { error: 1006, msg: "Internal Error" },
  { error: 1007, msg: "Balance Insufficient" },
  { error: 1008, msg: "Message is empty" },
  { error: 1009, msg: "Message Type Not Set(text / unicode)" },
  { error: 1010, msg: "Invalid User & Password" },
  { error: 1011, msg: "Invalid User Id" },
  { error: 1012, msg: "Invalid Number" },
  { error: 1013, msg: "API limit error" },
  { error: 1014, msg: "No matching template" }
];

module.exports = data => new Promise((resolve, reject) => {
  if (`${data}`.startsWith("SMS SUBMITTED")) {
    resolve("SMS submitted");
  } else {
    const error = errors.find(el => el.error === data);
    if(error) {
      reject(error.msg);
    } else {
      console.log(data);
      reject("Unknown error, please check the log");
    }
  }
});
