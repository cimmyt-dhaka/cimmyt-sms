const
  { request } = require('axios'),

  {
    techbhai_key: key,
    techbhai_server: server,
    techbhai_senderID: sender
  } = require('../../config/keys.js'),

  analyzeResponse = require('./analyze-response.js');


module.exports = async (req, res) => {
  const
    { to, body, unicode } = req.body,
    { path } = req;

  try {
    const
      resRequest = await request({
        url: '/smsapi',
        method: 'get',
        baseURL: server,
        [path === '/send' ? 'params' : 'data']: {
          api_key: key,
          senderid: sender,
          type: unicode ? 'unicode' : 'text',
          msg: body,
          contacts: to.split(',').join('+')
        }
      }),
      analysis = await analyzeResponse(resRequest.data);

    res.json(analysis);
  } catch (error) {
    res.status(500).json(error);
  }
};
