const
  { request } = require('axios'),

  analyzeResponse = require('./analyze-response.js'),

  {
    ssdtech_username: userName,
    ssdtech_password: password,
    ssdtech_server: baseURL
  } = require('../../config/keys.js');

module.exports = async (req, res) => {
  const
    { to, body: message, unicode } = req.body;

  try {
    const
      masking = 'NOMASK',
      MsgType = unicode ? 'UNICODE' : 'TEXT',
      receiver = to.split(',').join("|"),
      resRequest = await request({
        url: '/externalApiSendTextMessage.php',
        method: 'get',
        baseURL,
        params: { masking, userName, password, MsgType, receiver, message }
      }),
      analysis = await analyzeResponse(resRequest.data);

    res.json(analysis);
  } catch (error) {
    res.status(500).json(error);
  }
};
